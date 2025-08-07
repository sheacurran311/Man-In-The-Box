import { sql } from "drizzle-orm";
import { relations } from 'drizzle-orm';
import { pgTable, text, varchar, integer, real, boolean, timestamp, pgEnum, index, jsonb } from "drizzle-orm/pg-core";
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

// User roles and access control
export const userRoleEnum = pgEnum('user_role', ['creator', 'observer', 'pending']);
export const accessLevelEnum = pgEnum('access_level', ['none', 'video_stream', 'full_control']);
export const tokenStatusEnum = pgEnum('token_status', ['active', 'revoked', 'expired']);

// Authentication tables for early user identification
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Session storage for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Creator-controlled observer tokens for video stream access
export const observerTokens = pgTable("observer_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").references(() => users.id).notNull(),
  observerId: varchar("observer_id").references(() => users.id).notNull(),
  entityId: varchar("entity_id").references(() => aiEntities.id).notNull(),
  accessLevel: accessLevelEnum("access_level").default('video_stream'),
  status: tokenStatusEnum("status").default('active'),
  grantedAt: timestamp("granted_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // Optional expiration
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Access logs for tracking who's using the platform
export const accessLogs = pgTable("access_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  action: text("action").notNull(), // 'login', 'view_stream', 'interact', 'request_access'
  entityId: varchar("entity_id").references(() => aiEntities.id),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address"),
  metadata: jsonb("metadata"), // Additional context data
  timestamp: timestamp("timestamp").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  createdTokens: many(observerTokens, { relationName: "creator" }),
  observerTokens: many(observerTokens, { relationName: "observer" }),
  accessLogs: many(accessLogs),
}));

export const observerTokensRelations = relations(observerTokens, ({ one }) => ({
  creator: one(users, { 
    fields: [observerTokens.creatorId], 
    references: [users.id],
    relationName: "creator"
  }),
  observer: one(users, { 
    fields: [observerTokens.observerId], 
    references: [users.id],
    relationName: "observer"
  }),
  entity: one(aiEntities, {
    fields: [observerTokens.entityId],
    references: [aiEntities.id],
  }),
}));

export const accessLogsRelations = relations(accessLogs, ({ one }) => ({
  user: one(users, {
    fields: [accessLogs.userId],
    references: [users.id],
  }),
  entity: one(aiEntities, {
    fields: [accessLogs.entityId],
    references: [aiEntities.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertObserverTokenSchema = createInsertSchema(observerTokens).omit({
  id: true,
  createdAt: true,
});

export const insertAccessLogSchema = createInsertSchema(accessLogs).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ObserverToken = typeof observerTokens.$inferSelect;
export type InsertObserverToken = z.infer<typeof insertObserverTokenSchema>;
export type AccessLog = typeof accessLogs.$inferSelect;
export type InsertAccessLog = z.infer<typeof insertAccessLogSchema>;

export type AiEntity = typeof aiEntities.$inferSelect;
export type InsertAiEntity = z.infer<typeof insertAiEntitySchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type KnowledgeModule = typeof knowledgeModules.$inferSelect;
export type InsertKnowledgeModule = z.infer<typeof insertKnowledgeModuleSchema>;
