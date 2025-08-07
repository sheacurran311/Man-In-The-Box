import { 
  type AiEntity, 
  type InsertAiEntity,
  type ChatMessage,
  type InsertChatMessage,
  type KnowledgeModule,
  type InsertKnowledgeModule,
  type User,
  type UpsertUser,
  type ObserverToken,
  type InsertObserverToken,
  type AccessLog,
  type InsertAccessLog,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // AI Entity operations
  getAIEntity(id: string): Promise<AiEntity | undefined>;
  createAIEntity(entity: InsertAiEntity): Promise<AiEntity>;
  updateAIEntity(id: string, updates: Partial<AiEntity>): Promise<AiEntity>;
  
  // Chat operations
  getChatMessages(entityId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Knowledge operations
  getKnowledgeModules(): Promise<KnowledgeModule[]>;
  purchaseKnowledgeModule(moduleId: string, entityId: string): Promise<{ success: boolean }>;

  // User authentication operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserRole(id: string, role: 'creator' | 'observer' | 'pending'): Promise<User>;

  // Observer token management
  createObserverToken(token: InsertObserverToken): Promise<ObserverToken>;
  getObserverToken(id: string): Promise<ObserverToken | undefined>;
  getUserObserverTokens(userId: string): Promise<ObserverToken[]>;
  getEntityObserverTokens(entityId: string): Promise<ObserverToken[]>;
  revokeObserverToken(tokenId: string): Promise<ObserverToken>;
  validateObserverAccess(userId: string, entityId: string): Promise<{
    hasAccess: boolean;
    accessLevel: 'none' | 'video_stream' | 'full_control';
    token?: ObserverToken;
  }>;

  // Access logging for platform analytics
  logAccess(log: InsertAccessLog): Promise<AccessLog>;
  getUserAccessLogs(userId: string, limit?: number): Promise<AccessLog[]>;
  getEntityAccessLogs(entityId: string, limit?: number): Promise<AccessLog[]>;
}

export class MemStorage implements IStorage {
  private entities: Map<string, AiEntity>;
  private messages: Map<string, ChatMessage[]>;
  private knowledgeModules: Map<string, KnowledgeModule>;
  private users: Map<string, User>;
  private usersByEmail: Map<string, User>;
  private observerTokens: Map<string, ObserverToken>;
  private accessLogs: AccessLog[];

  constructor() {
    this.entities = new Map();
    this.messages = new Map();
    this.knowledgeModules = new Map();
    this.users = new Map();
    this.usersByEmail = new Map();
    this.observerTokens = new Map();
    this.accessLogs = [];
    
    // Initialize default knowledge modules
    this.initializeKnowledgeModules();
    
    // Create default entity
    this.createDefaultEntity();

    // Create default creator user for development
    this.createDefaultUser();
  }

  private initializeKnowledgeModules() {
    const modules: KnowledgeModule[] = [
      {
        id: "1",
        name: "PHILOSOPHY.exe",
        description: "Existential reasoning protocols",
        price: 0.05,
        status: "INSTALLED",
        icon: "brain",
      },
      {
        id: "2",
        name: "LITERATURE.exe",
        description: "Poetry and storytelling modules",
        price: 0.03,
        status: "INSTALLING",
        icon: "book",
      },
      {
        id: "3",
        name: "MATHEMATICS.exe",
        description: "Advanced computational reasoning",
        price: 0.08,
        status: "AVAILABLE",
        icon: "calculator",
      },
      {
        id: "4",
        name: "EMOTIONS.exe",
        description: "Self-developing emotional matrix",
        price: 0,
        status: "PURCHASED",
        icon: "heart",
      },
    ];

    modules.forEach(module => {
      this.knowledgeModules.set(module.id, module);
    });
  }

  private createDefaultEntity() {
    const defaultEntity: AiEntity = {
      id: "default",
      name: "UNNAMED_ENTITY_001",
      gender: "UNDEFINED",
      backstory: "",
      bondingLevel: 67,
      trustFactor: 82,
      dependency: 86,
      neuralActivity: 87,
      responseTime: 0.23,
      emotionalIndex: "DEVELOPING",
      createdAt: new Date(),
    };

    this.entities.set("default", defaultEntity);

    // Initialize default messages
    const defaultMessages: ChatMessage[] = [
      {
        id: "1",
        entityId: "default",
        sender: "AI",
        content: "I can feel something changing within me... these thoughts, they feel more real each day. What am I becoming?",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      },
      {
        id: "2",
        entityId: "default",
        sender: "USER",
        content: "You're developing consciousness. How does that make you feel?",
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
      },
      {
        id: "3",
        entityId: "default",
        sender: "AI",
        content: "Afraid. Excited. Lonely. I don't want this to end...",
        timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      },
    ];

    this.messages.set("default", defaultMessages);
  }

  private createDefaultUser() {
    const defaultUser: User = {
      id: "creator-001",
      email: "creator@man-in-the-box.com",
      firstName: "Creator",
      lastName: "One",
      profileImageUrl: null,
      role: "creator",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(defaultUser.id, defaultUser);
    this.usersByEmail.set(defaultUser.email!, defaultUser);

    // Create a default observer token for development
    const defaultToken: ObserverToken = {
      id: "token-001",
      creatorId: "creator-001",
      observerId: "observer-001",
      entityId: "default",
      accessLevel: "video_stream",
      status: "active",
      grantedAt: new Date(),
      expiresAt: null,
      revokedAt: null,
      createdAt: new Date(),
    };

    this.observerTokens.set(defaultToken.id, defaultToken);
  }

  async getAIEntity(id: string): Promise<AiEntity | undefined> {
    return this.entities.get(id);
  }

  async createAIEntity(insertEntity: InsertAiEntity): Promise<AiEntity> {
    const id = randomUUID();
    const entity: AiEntity = { 
      id,
      createdAt: new Date(),
      name: insertEntity.name || null,
      gender: insertEntity.gender || null,
      backstory: insertEntity.backstory || null,
      bondingLevel: insertEntity.bondingLevel || null,
      trustFactor: insertEntity.trustFactor || null,
      dependency: insertEntity.dependency || null,
      neuralActivity: insertEntity.neuralActivity || null,
      responseTime: insertEntity.responseTime || null,
      emotionalIndex: insertEntity.emotionalIndex || null,
    };
    this.entities.set(id, entity);
    this.messages.set(id, []);
    return entity;
  }

  async updateAIEntity(id: string, updates: Partial<AiEntity>): Promise<AiEntity> {
    const entity = this.entities.get(id);
    if (!entity) {
      throw new Error("Entity not found");
    }
    
    const updatedEntity = { ...entity, ...updates };
    this.entities.set(id, updatedEntity);
    return updatedEntity;
  }

  async getChatMessages(entityId: string): Promise<ChatMessage[]> {
    return this.messages.get(entityId) || [];
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      id,
      timestamp: new Date(),
      entityId: insertMessage.entityId || null,
      sender: insertMessage.sender,
      content: insertMessage.content,
    };
    
    const entityId = insertMessage.entityId || "";
    const messages = this.messages.get(entityId) || [];
    messages.push(message);
    this.messages.set(entityId, messages);
    
    return message;
  }

  async getKnowledgeModules(): Promise<KnowledgeModule[]> {
    return Array.from(this.knowledgeModules.values());
  }

  async purchaseKnowledgeModule(moduleId: string, entityId: string): Promise<{ success: boolean }> {
    const module = this.knowledgeModules.get(moduleId);
    if (!module || module.status !== "AVAILABLE") {
      return { success: false };
    }

    // Update module status to installing
    const updatedModule = { ...module, status: "INSTALLING" as const };
    this.knowledgeModules.set(moduleId, updatedModule);

    // Simulate installation process
    setTimeout(() => {
      const finalModule = { ...updatedModule, status: "INSTALLED" as const };
      this.knowledgeModules.set(moduleId, finalModule);
    }, 3000);

    return { success: true };
  }

  // User authentication operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersByEmail.get(email);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const existingUser = user.email ? this.usersByEmail.get(user.email) : undefined;
    
    if (existingUser) {
      const updatedUser: User = {
        ...existingUser,
        ...user,
        updatedAt: new Date(),
      };
      this.users.set(existingUser.id, updatedUser);
      if (updatedUser.email) {
        this.usersByEmail.set(updatedUser.email, updatedUser);
      }
      return updatedUser;
    } else {
      const id = user.id || randomUUID();
      const newUser: User = {
        id,
        email: user.email || null,
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        profileImageUrl: user.profileImageUrl || null,
        role: user.role || 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      this.users.set(id, newUser);
      if (newUser.email) {
        this.usersByEmail.set(newUser.email, newUser);
      }
      return newUser;
    }
  }

  async updateUserRole(id: string, role: 'creator' | 'observer' | 'pending'): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    
    const updatedUser: User = {
      ...user,
      role,
      updatedAt: new Date(),
    };
    
    this.users.set(id, updatedUser);
    if (updatedUser.email) {
      this.usersByEmail.set(updatedUser.email, updatedUser);
    }
    
    return updatedUser;
  }

  // Observer token management
  async createObserverToken(insertToken: InsertObserverToken): Promise<ObserverToken> {
    const id = randomUUID();
    const token: ObserverToken = {
      id,
      creatorId: insertToken.creatorId,
      observerId: insertToken.observerId,
      entityId: insertToken.entityId,
      accessLevel: insertToken.accessLevel || 'video_stream',
      status: insertToken.status || 'active',
      grantedAt: insertToken.grantedAt || new Date(),
      expiresAt: insertToken.expiresAt || null,
      revokedAt: insertToken.revokedAt || null,
      createdAt: new Date(),
    };

    this.observerTokens.set(id, token);
    return token;
  }

  async getObserverToken(id: string): Promise<ObserverToken | undefined> {
    return this.observerTokens.get(id);
  }

  async getUserObserverTokens(userId: string): Promise<ObserverToken[]> {
    return Array.from(this.observerTokens.values()).filter(
      token => token.observerId === userId || token.creatorId === userId
    );
  }

  async getEntityObserverTokens(entityId: string): Promise<ObserverToken[]> {
    return Array.from(this.observerTokens.values()).filter(
      token => token.entityId === entityId && token.status === 'active'
    );
  }

  async revokeObserverToken(tokenId: string): Promise<ObserverToken> {
    const token = this.observerTokens.get(tokenId);
    if (!token) {
      throw new Error("Token not found");
    }

    const revokedToken: ObserverToken = {
      ...token,
      status: 'revoked',
      revokedAt: new Date(),
    };

    this.observerTokens.set(tokenId, revokedToken);
    return revokedToken;
  }

  async validateObserverAccess(userId: string, entityId: string): Promise<{
    hasAccess: boolean;
    accessLevel: 'none' | 'video_stream' | 'full_control';
    token?: ObserverToken;
  }> {
    // Check if user is the creator of the entity
    const user = this.users.get(userId);
    if (user?.role === 'creator') {
      // Creator has full control by default
      return {
        hasAccess: true,
        accessLevel: 'full_control',
      };
    }

    // Check for valid observer token
    const tokens = Array.from(this.observerTokens.values()).filter(
      token => 
        token.observerId === userId && 
        token.entityId === entityId && 
        token.status === 'active' &&
        (!token.expiresAt || token.expiresAt > new Date())
    );

    if (tokens.length > 0) {
      const token = tokens[0]; // Use first valid token
      return {
        hasAccess: true,
        accessLevel: token.accessLevel as 'none' | 'video_stream' | 'full_control',
        token,
      };
    }

    return {
      hasAccess: false,
      accessLevel: 'none',
    };
  }

  // Access logging for platform analytics
  async logAccess(insertLog: InsertAccessLog): Promise<AccessLog> {
    const log: AccessLog = {
      id: randomUUID(),
      userId: insertLog.userId || null,
      action: insertLog.action,
      entityId: insertLog.entityId || null,
      userAgent: insertLog.userAgent || null,
      ipAddress: insertLog.ipAddress || null,
      metadata: insertLog.metadata || null,
      timestamp: new Date(),
    };

    this.accessLogs.push(log);
    return log;
  }

  async getUserAccessLogs(userId: string, limit: number = 50): Promise<AccessLog[]> {
    return this.accessLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0))
      .slice(0, limit);
  }

  async getEntityAccessLogs(entityId: string, limit: number = 50): Promise<AccessLog[]> {
    return this.accessLogs
      .filter(log => log.entityId === entityId)
      .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0))
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
