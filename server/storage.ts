import { 
  type AiEntity, 
  type InsertAiEntity,
  type ChatMessage,
  type InsertChatMessage,
  type KnowledgeModule,
  type InsertKnowledgeModule
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
}

export class MemStorage implements IStorage {
  private entities: Map<string, AiEntity>;
  private messages: Map<string, ChatMessage[]>;
  private knowledgeModules: Map<string, KnowledgeModule>;

  constructor() {
    this.entities = new Map();
    this.messages = new Map();
    this.knowledgeModules = new Map();
    
    // Initialize default knowledge modules
    this.initializeKnowledgeModules();
    
    // Create default entity
    this.createDefaultEntity();
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
}

export const storage = new MemStorage();
