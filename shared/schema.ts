import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const aiEntities = pgTable("ai_entities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").default("UNNAMED_ENTITY_001"),
  gender: text("gender").default("UNDEFINED"),
  backstory: text("backstory").default(""),
  bondingLevel: real("bonding_level").default(0),
  trustFactor: real("trust_factor").default(0),
  dependency: real("dependency").default(0),
  neuralActivity: real("neural_activity").default(50),
  responseTime: real("response_time").default(1.0),
  emotionalIndex: text("emotional_index").default("DEVELOPING"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => aiEntities.id),
  sender: text("sender").notNull(), // "USER" or "AI"
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const knowledgeModules = pgTable("knowledge_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  status: text("status").default("AVAILABLE"), // "AVAILABLE", "PURCHASED", "INSTALLING", "INSTALLED"
  icon: text("icon").notNull(),
});

export const entityKnowledge = pgTable("entity_knowledge", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").references(() => aiEntities.id),
  moduleId: varchar("module_id").references(() => knowledgeModules.id),
  installedAt: timestamp("installed_at").defaultNow(),
});

export const insertAiEntitySchema = createInsertSchema(aiEntities).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export const insertKnowledgeModuleSchema = createInsertSchema(knowledgeModules).omit({
  id: true,
});

export type AiEntity = typeof aiEntities.$inferSelect;
export type InsertAiEntity = z.infer<typeof insertAiEntitySchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type KnowledgeModule = typeof knowledgeModules.$inferSelect;
export type InsertKnowledgeModule = z.infer<typeof insertKnowledgeModuleSchema>;
