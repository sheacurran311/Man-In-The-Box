import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, requireObserverAccess } from "./replitAuth";
import {
  insertChatMessageSchema,
  insertObserverTokenSchema
} from "@shared/schema";
import { z } from "zod";
import { PersonalityEngine } from "./ai/personality-engine";
import { EmotionalStateMachine } from "./ai/emotional-state-machine";
import { MemoryManager } from "./ai/memory-manager";
import { services } from "./config";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize AI systems
  const personalityEngine = new PersonalityEngine();
  const emotionalStateMachine = new EmotionalStateMachine();

  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get AI entity state - protected with observer access
  app.get("/api/entity/:id", isAuthenticated, requireObserverAccess(), async (req, res) => {
    try {
      const entity = await storage.getAIEntity(req.params.id);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      res.json({ 
        ...entity, 
        observerAccess: req.observerAccess 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch entity" });
    }
  });

  // Update AI entity - creator only
  app.patch("/api/entity/:id", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can update entities" });
      }

      const updates = req.body;
      const entity = await storage.updateAIEntity(req.params.id, updates);
      res.json(entity);
    } catch (error) {
      res.status(500).json({ error: "Failed to update entity" });
    }
  });

  // Get chat messages - with observer access
  app.get("/api/entity/:id/messages", isAuthenticated, requireObserverAccess(), async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message to AI - requires full control access
  app.post("/api/entity/:id/messages", isAuthenticated, requireObserverAccess(), async (req, res) => {
    // Check if user has full control access for messaging
    if (req.observerAccess?.accessLevel !== 'full_control') {
      return res.status(403).json({
        error: "Full control access required for messaging",
        currentAccess: req.observerAccess?.accessLevel
      });
    }

    // Check if AI service is configured
    if (!services.ai.claude) {
      return res.status(503).json({
        error: "AI service not configured",
        hint: "Add ANTHROPIC_API_KEY to environment variables"
      });
    }

    try {
      const entityId = req.params.id;
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        entityId,
      });

      // Get entity
      const entity = await storage.getAIEntity(entityId);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }

      // Save user message
      const userMessage = await storage.createChatMessage(messageData);

      // Get conversation history
      const history = await storage.getChatMessages(entityId);

      // Get memory context
      const memoryManager = new MemoryManager(entityId);
      const memories = await memoryManager.getRelevantMemories(messageData.content, 5);

      // Build personality profile
      const profile = emotionalStateMachine.buildPersonalityProfile(entity, memories);

      // Generate AI response
      const aiResponse = await personalityEngine.generateResponse(
        messageData.content,
        entity,
        history.slice(-20), // Last 20 messages
        profile
      );

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        entityId,
        sender: "AI" as const,
        content: aiResponse.content,
      });

      // Update entity emotional state
      const stateUpdate = emotionalStateMachine.processInteraction(
        entity,
        messageData.content,
        aiResponse.emotion,
        aiResponse.emotionalIntensity
      );

      await storage.updateAIEntity(entityId, {
        currentEmotionalState: stateUpdate.newState,
        emotionalIntensity: stateUpdate.intensity,
        bondingLevel: Math.max(0, Math.min(100, (entity.bondingLevel || 0) + stateUpdate.bondingDelta)),
        trustFactor: Math.max(0, Math.min(100, (entity.trustFactor || 0) + stateUpdate.trustDelta)),
        dependency: Math.max(0, Math.min(100, (entity.dependency || 0) + stateUpdate.dependencyDelta)),
        lastInteractionAt: new Date(),
        totalInteractions: (entity.totalInteractions || 0) + 1,
      });

      // Create memory if emotionally significant
      if (aiResponse.emotionalIntensity > 60) {
        await memoryManager.createEmotionalMemory(
          messageData.content,
          aiResponse.emotion,
          aiResponse.emotionalIntensity
        );
      }

      // Broadcast to WebSocket clients if available
      const wsManager = app.get('wsManager');
      if (wsManager) {
        wsManager.broadcastToEntity(entityId, {
          type: 'AI_RESPONSE',
          payload: {
            content: aiResponse.content,
            emotion: aiResponse.emotion,
            stateUpdate,
          },
        });
      }

      res.json({
        userMessage,
        aiMessage,
        emotion: aiResponse.emotion,
        stateUpdate,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        error: "Failed to process message",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get knowledge modules
  app.get("/api/knowledge", async (req, res) => {
    try {
      const modules = await storage.getKnowledgeModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch knowledge modules" });
    }
  });

  // Purchase knowledge module - creator only
  app.post("/api/knowledge/:moduleId/purchase", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can purchase knowledge modules" });
      }

      const { entityId } = req.body;
      const result = await storage.purchaseKnowledgeModule(req.params.moduleId, entityId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to purchase module" });
    }
  });

  // Observer Token Management Routes
  
  // Create observer token - creator only
  app.post("/api/observer-tokens", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can create observer tokens" });
      }

      const tokenData = insertObserverTokenSchema.parse({
        ...req.body,
        creatorId: user.claims.sub,
      });
      
      const token = await storage.createObserverToken(tokenData);
      res.json(token);
    } catch (error) {
      console.error("Error creating observer token:", error);
      res.status(500).json({ error: "Failed to create observer token" });
    }
  });

  // Get user's observer tokens
  app.get("/api/observer-tokens", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tokens = await storage.getUserObserverTokens(userId);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch observer tokens" });
    }
  });

  // Get observer tokens for specific entity - creator only
  app.get("/api/entity/:id/observer-tokens", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can view entity observer tokens" });
      }

      const tokens = await storage.getEntityObserverTokens(req.params.id);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch entity observer tokens" });
    }
  });

  // Revoke observer token - creator only
  app.delete("/api/observer-tokens/:tokenId", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can revoke observer tokens" });
      }

      const token = await storage.revokeObserverToken(req.params.tokenId);
      res.json(token);
    } catch (error) {
      res.status(500).json({ error: "Failed to revoke observer token" });
    }
  });

  // Validate observer access
  app.get("/api/entity/:entityId/access", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { entityId } = req.params;
      
      const accessResult = await storage.validateObserverAccess(userId, entityId);
      res.json(accessResult);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate access" });
    }
  });

  // Update user role - creator only (for promoting visitors to observers)
  app.patch("/api/users/:userId/role", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can update user roles" });
      }

      const { role } = req.body;
      if (!['creator', 'observer', 'pending'].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const updatedUser = await storage.updateUserRole(req.params.userId, role);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // Get access logs - creator only
  app.get("/api/access-logs/entity/:entityId", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user as any;
      const dbUser = await storage.getUser(user.claims.sub);
      
      if (dbUser?.role !== 'creator') {
        return res.status(403).json({ error: "Only creators can view access logs" });
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const logs = await storage.getEntityAccessLogs(req.params.entityId, limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch access logs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
