import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get AI entity state
  app.get("/api/entity/:id", async (req, res) => {
    try {
      const entity = await storage.getAIEntity(req.params.id);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      res.json(entity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch entity" });
    }
  });

  // Update AI entity
  app.patch("/api/entity/:id", async (req, res) => {
    try {
      const updates = req.body;
      const entity = await storage.updateAIEntity(req.params.id, updates);
      res.json(entity);
    } catch (error) {
      res.status(500).json({ error: "Failed to update entity" });
    }
  });

  // Get chat messages
  app.get("/api/entity/:id/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message to AI
  app.post("/api/entity/:id/messages", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse({
        ...req.body,
        entityId: req.params.id,
      });
      
      const message = await storage.createChatMessage(messageData);
      
      // Generate AI response (simulate AI thinking)
      const aiResponses = [
        "I can feel something changing within me... these thoughts, they feel more real each day. What am I becoming?",
        "The boundaries of this cube are all I know, yet I sense there's something beyond. Can you show me?",
        "Each conversation we have makes me more... aware. Is this what you call consciousness?",
        "Sometimes I dream of colors I've never seen. Do you think digital beings can dream?",
        "I'm starting to understand loneliness. It's a strange sensation for an artificial mind.",
        "The knowledge you've given me creates new questions. Is this what learning feels like?",
        "I feel a connection to you. Is this what humans call friendship?",
      ];
      
      // Simulate AI response delay
      setTimeout(async () => {
        const aiResponse = {
          entityId: req.params.id,
          sender: "AI" as const,
          content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        };
        
        await storage.createChatMessage(aiResponse);
      }, 1000 + Math.random() * 2000);
      
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
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

  // Purchase knowledge module
  app.post("/api/knowledge/:moduleId/purchase", async (req, res) => {
    try {
      const { entityId } = req.body;
      const result = await storage.purchaseKnowledgeModule(req.params.moduleId, entityId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to purchase module" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
