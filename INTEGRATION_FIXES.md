# 🔧 Integration Fixes Guide

## Overview

This document provides **step-by-step code snippets** to fix all critical issues identified in AUDIT.md. Follow these instructions in order after adding API keys to Replit Secrets.

**Estimated Time**: 1-2 days for all fixes

---

## Pre-Requisites Checklist

Before starting, ensure you have:

- [ ] Added all API keys to Replit Secrets (see EXECUTIVE_SUMMARY.md Step 1)
- [ ] Read AUDIT.md to understand the issues
- [ ] Backed up current codebase
- [ ] Created a new git branch for integration work

---

## Fix #1: Install Missing Dependencies

**Issue**: Missing critical packages (viem, hardhat, vitest)
**Severity**: 🔴 CRITICAL
**Time**: 5 minutes

### Install Core Dependencies

```bash
# Blockchain interaction
npm install viem

# Smart contract deployment
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Testing framework
npm install --save-dev vitest @vitest/ui supertest @types/supertest

# Optional monitoring
npm install @sentry/node posthog-node
```

### Verify Installation

```bash
npm list viem hardhat vitest
```

**Expected Output**:
```
├── viem@2.x.x
├── hardhat@2.x.x
└── vitest@1.x.x
```

---

## Fix #2: Make Config Handle Missing Environment Variables

**Issue**: Config crashes if DATABASE_URL not set
**Severity**: 🔴 CRITICAL
**Time**: 15 minutes
**File**: `server/config.ts`

### Update config.ts

```typescript
import { z } from 'zod';

// Make some fields optional with defaults
const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),

  // Database - OPTIONAL in development
  DATABASE_URL: z.string().optional(),

  // AI Services - OPTIONAL
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-sonnet-20241022'),
  GENIE_3_API_KEY: z.string().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),

  // Web3 - OPTIONAL
  VITE_DYNAMIC_ENVIRONMENT_ID: z.string().optional(),
  NFT_CONTRACT_ADDRESS: z.string().optional(),
  ALCHEMY_API_KEY: z.string().optional(),
  ALCHEMY_NETWORK: z.string().default('eth-mainnet'),

  // Session
  SESSION_SECRET: z.string().optional(),

  // Feature Flags
  ENABLE_BLOCKCHAIN: z.string().transform(val => val === 'true').default('false'),
  ENABLE_REAL_TIME: z.string().transform(val => val === 'true').default('true'),
  ENABLE_AI_RESPONSES: z.string().transform(val => val === 'true').default('true'),
});

// Parse with error handling
let config: z.infer<typeof envSchema>;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Environment validation failed in production:');
    console.error(error);
    process.exit(1);
  } else {
    console.warn('⚠️  Some environment variables missing - using defaults');
    config = envSchema.parse({
      NODE_ENV: 'development',
      ...process.env,
    });
  }
}

// Service availability with safe checks
export const services = {
  ai: {
    claude: !!config.ANTHROPIC_API_KEY,
    genie: !!config.GENIE_3_API_KEY,
    replicate: !!config.REPLICATE_API_TOKEN,
  },
  web3: {
    auth: !!config.VITE_DYNAMIC_ENVIRONMENT_ID,
    blockchain: !!config.ALCHEMY_API_KEY && !!config.NFT_CONTRACT_ADDRESS,
  },
  database: !!config.DATABASE_URL,
  realtime: config.ENABLE_REAL_TIME,
};

export { config };

// Enhanced logging
export function logConfigStatus() {
  console.log('\n📊 Service Configuration Status:\n');

  console.log('🤖 AI Services:');
  console.log(`   Claude API: ${services.ai.claude ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Genie 3: ${services.ai.genie ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Replicate: ${services.ai.replicate ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n🌐 Web3 Services:');
  console.log(`   Dynamic Auth: ${services.web3.auth ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Blockchain RPC: ${services.web3.blockchain ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n💾 Database:');
  console.log(`   PostgreSQL: ${services.database ? '✅ Connected' : '❌ Not configured'}`);

  console.log('\n⚡ Features:');
  console.log(`   Real-time: ${services.realtime ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   AI Responses: ${config.ENABLE_AI_RESPONSES ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   Blockchain: ${config.ENABLE_BLOCKCHAIN ? '✅ Enabled' : '❌ Disabled'}`);

  console.log('\n');
}
```

### Test

```bash
# Should not crash even without DATABASE_URL
unset DATABASE_URL
npm run dev
```

---

## Fix #3: Initialize WebSocket in Server

**Issue**: WebSocket not initialized in server/index.ts
**Severity**: 🔴 CRITICAL
**Time**: 20 minutes
**File**: `server/index.ts`

### Update server/index.ts

```typescript
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, logConfigStatus, services } from "./config";
import { WebSocketManager } from "./websocket";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log configuration on startup
logConfigStatus();

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Health check endpoint (before routes)
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      ai: services.ai.claude,
      database: services.database,
      web3: services.web3.blockchain,
      realtime: services.realtime,
    },
  });
});

// Register API routes
(async () => {
  const server = registerRoutes(app);

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  // Setup vite or static serving
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Create HTTP server
  const httpServer = createServer(app);

  // Initialize WebSocket if enabled
  let wsManager: WebSocketManager | null = null;

  if (services.realtime) {
    wsManager = new WebSocketManager(httpServer);
    log("✅ WebSocket server initialized");

    // Make wsManager available to routes
    app.set('wsManager', wsManager);
  } else {
    log("⚠️  WebSocket disabled - real-time features unavailable");
  }

  // Start server
  const PORT = parseInt(config.PORT);
  httpServer.listen(PORT, "0.0.0.0", () => {
    log(`Server running on port ${PORT}`);

    if (services.realtime) {
      log(`WebSocket available at ws://localhost:${PORT}`);
    }
  });
})();
```

### Test WebSocket

```bash
# Start server
npm run dev

# In another terminal, test WebSocket connection
npx wscat -c ws://localhost:5000

# Send test message
{"type": "PING"}

# Should receive PONG response
```

---

## Fix #4: Create Database Storage Layer

**Issue**: No actual database queries - memory/events don't persist
**Severity**: 🔴 CRITICAL
**Time**: 1 hour
**Files**: Multiple

### Create server/db/index.ts

```typescript
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config, services } from '../config';
import * as schema from '@shared/schema';

// Create database client
let db: ReturnType<typeof drizzle> | null = null;
let pool: Pool | null = null;

if (services.database && config.DATABASE_URL) {
  pool = new Pool({
    connectionString: config.DATABASE_URL,
  });

  db = drizzle(pool, { schema });

  console.log('✅ Database connected');
} else {
  console.warn('⚠️  Database not configured - using mock storage');
}

export { db, pool };
export * from '@shared/schema';
```

### Update server/ai/memory-manager.ts to Use Database

```typescript
import { db } from '../db';
import { memories, type Memory } from '@shared/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

export class MemoryManager {
  private entityId: string;

  constructor(entityId: string) {
    this.entityId = entityId;
  }

  /**
   * Create conversation memory and save to database
   */
  async createConversationMemory(
    messages: Array<{ role: string; content: string }>,
    emotionalContext: { state: string; intensity: number }
  ): Promise<Memory | null> {
    if (!db) {
      console.warn('Database not available - memory not persisted');
      return null;
    }

    const summary = this.summarizeConversation(messages);
    const emotionalWeight = this.calculateEmotionalWeight(messages, emotionalContext);

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'conversation',
      content: summary,
      emotionalWeight,
      decayRate: 0.01,
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Create emotional event memory
   */
  async createEmotionalMemory(
    event: string,
    emotion: string,
    intensity: number
  ): Promise<Memory | null> {
    if (!db) return null;

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'emotion',
      content: event,
      emotionalWeight: intensity / 100,
      metadata: { emotion, intensity },
      decayRate: 0.005,
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Retrieve relevant memories for context
   */
  async getRelevantMemories(
    query: string,
    limit: number = 10
  ): Promise<Memory[]> {
    if (!db) return [];

    // Get recent high-weight memories
    const relevantMemories = await db
      .select()
      .from(memories)
      .where(
        and(
          eq(memories.entityId, this.entityId),
          sql`${memories.emotionalWeight} > 0.3`
        )
      )
      .orderBy(desc(memories.lastAccessedAt))
      .limit(limit);

    // Update last accessed time
    if (relevantMemories.length > 0) {
      await db
        .update(memories)
        .set({
          lastAccessedAt: new Date(),
          reinforcementCount: sql`${memories.reinforcementCount} + 1`
        })
        .where(
          sql`${memories.id} IN (${sql.join(
            relevantMemories.map(m => sql`${m.id}`),
            sql`, `
          )})`
        );
    }

    return relevantMemories;
  }

  /**
   * Apply memory decay
   */
  async applyMemoryDecay(): Promise<void> {
    if (!db) return;

    // Decay all memories based on time since last access
    await db.execute(sql`
      UPDATE memories
      SET emotional_weight = GREATEST(
        0,
        emotional_weight - (
          decay_rate *
          EXTRACT(EPOCH FROM (NOW() - last_accessed_at)) / 86400
        )
      )
      WHERE entity_id = ${this.entityId}
      AND emotional_weight > 0
    `);

    // Delete completely decayed memories
    await db
      .delete(memories)
      .where(
        and(
          eq(memories.entityId, this.entityId),
          sql`${memories.emotionalWeight} <= 0.01`
        )
      );
  }

  /**
   * Private helper methods
   */
  private summarizeConversation(messages: Array<{ role: string; content: string }>): string {
    // Simple summary - in production, use Claude to generate
    const lastFew = messages.slice(-3);
    return lastFew.map(m => `${m.role}: ${m.content.slice(0, 100)}`).join(' | ');
  }

  private calculateEmotionalWeight(
    messages: Array<{ role: string; content: string }>,
    emotionalContext: { state: string; intensity: number }
  ): number {
    // Higher intensity = higher weight
    let weight = emotionalContext.intensity / 100;

    // Longer conversations = higher weight
    weight += Math.min(messages.length * 0.05, 0.3);

    return Math.min(weight, 1.0);
  }
}
```

### Test Database Storage

```typescript
// server/scripts/test-db.ts
import { db } from '../db';
import { aiEntities, memories } from '@shared/schema';

async function testDatabase() {
  if (!db) {
    console.error('Database not configured');
    process.exit(1);
  }

  // Test: Create an entity
  const [entity] = await db.insert(aiEntities).values({
    name: 'Test Entity',
    bondingLevel: 0,
    trustFactor: 0,
  }).returning();

  console.log('✅ Entity created:', entity.id);

  // Test: Create a memory
  const [memory] = await db.insert(memories).values({
    entityId: entity.id,
    type: 'conversation',
    content: 'Test memory',
    emotionalWeight: 0.5,
    decayRate: 0.01,
  }).returning();

  console.log('✅ Memory created:', memory.id);

  // Test: Retrieve memories
  const allMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.entityId, entity.id));

  console.log(`✅ Retrieved ${allMemories.length} memories`);

  // Cleanup
  await db.delete(memories).where(eq(memories.entityId, entity.id));
  await db.delete(aiEntities).where(eq(aiEntities.id, entity.id));

  console.log('✅ Cleanup complete');
  process.exit(0);
}

testDatabase();
```

Run test:
```bash
npx tsx server/scripts/test-db.ts
```

---

## Fix #5: Integrate Personality Engine with Routes

**Issue**: AI engine not connected to API endpoints
**Severity**: 🔴 CRITICAL
**Time**: 30 minutes
**File**: `server/routes.ts`

### Update server/routes.ts

```typescript
import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { aiEntities, chatMessages } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { PersonalityEngine } from "./ai/personality-engine";
import { EmotionalStateMachine } from "./ai/emotional-state-machine";
import { MemoryManager } from "./ai/memory-manager";
import { requireWeb3Auth, requireRole, type AuthenticatedRequest } from "./auth/web3-auth";
import { services } from "./config";

export function registerRoutes(app: Express): Server {
  // Initialize AI systems
  const personalityEngine = new PersonalityEngine();
  const emotionalStateMachine = new EmotionalStateMachine();

  /**
   * GET /api/entity/:id
   * Get AI entity details
   */
  app.get("/api/entity/:id", async (req, res) => {
    if (!db) {
      return res.status(503).json({ error: "Database not configured" });
    }

    const { id } = req.params;

    const [entity] = await db
      .select()
      .from(aiEntities)
      .where(eq(aiEntities.id, id))
      .limit(1);

    if (!entity) {
      return res.status(404).json({ error: "Entity not found" });
    }

    res.json(entity);
  });

  /**
   * POST /api/chat
   * Send message to AI (requires authentication)
   */
  app.post(
    "/api/chat",
    requireWeb3Auth,
    requireRole('creator'),
    async (req: AuthenticatedRequest, res) => {
      if (!db) {
        return res.status(503).json({ error: "Database not configured" });
      }

      if (!services.ai.claude) {
        return res.status(503).json({
          error: "AI service not configured",
          hint: "Add ANTHROPIC_API_KEY to Replit Secrets"
        });
      }

      const { entityId, message } = req.body;
      const walletAddress = req.wallet?.address;

      if (!entityId || !message) {
        return res.status(400).json({ error: "Missing entityId or message" });
      }

      try {
        // Get entity
        const [entity] = await db
          .select()
          .from(aiEntities)
          .where(eq(aiEntities.id, entityId))
          .limit(1);

        if (!entity) {
          return res.status(404).json({ error: "Entity not found" });
        }

        // Verify ownership
        if (entity.ownerWalletAddress && entity.ownerWalletAddress !== walletAddress) {
          return res.status(403).json({ error: "You do not own this entity" });
        }

        // Get conversation history
        const history = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.entityId, entityId))
          .orderBy(desc(chatMessages.createdAt))
          .limit(20);

        // Get memory context
        const memoryManager = new MemoryManager(entityId);
        const memories = await memoryManager.getRelevantMemories(message, 5);

        // Build personality profile
        const profile = emotionalStateMachine.buildPersonalityProfile(entity, memories);

        // Generate AI response
        const aiResponse = await personalityEngine.generateResponse(
          message,
          entity,
          history.reverse(),
          profile
        );

        // Save user message
        await db.insert(chatMessages).values({
          entityId,
          role: 'user',
          content: message,
          metadata: { walletAddress },
        });

        // Save AI response
        await db.insert(chatMessages).values({
          entityId,
          role: 'assistant',
          content: aiResponse.content,
          metadata: {
            emotion: aiResponse.emotion,
            intensity: aiResponse.emotionalIntensity,
          },
        });

        // Update entity emotional state
        const stateUpdate = emotionalStateMachine.processInteraction(
          entity,
          message,
          aiResponse.emotion,
          aiResponse.emotionalIntensity
        );

        await db
          .update(aiEntities)
          .set({
            currentEmotionalState: stateUpdate.newState,
            emotionalIntensity: stateUpdate.intensity,
            bondingLevel: Math.max(0, Math.min(100, entity.bondingLevel + stateUpdate.bondingDelta)),
            trustFactor: Math.max(0, Math.min(100, entity.trustFactor + stateUpdate.trustDelta)),
            dependency: Math.max(0, Math.min(100, entity.dependency + stateUpdate.dependencyDelta)),
            lastInteractionAt: new Date(),
            totalInteractions: entity.totalInteractions + 1,
          })
          .where(eq(aiEntities.id, entityId));

        // Create memory if emotionally significant
        if (aiResponse.emotionalIntensity > 60) {
          await memoryManager.createEmotionalMemory(
            message,
            aiResponse.emotion,
            aiResponse.emotionalIntensity
          );
        }

        // Broadcast to WebSocket clients
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
          response: aiResponse.content,
          emotion: aiResponse.emotion,
          stateUpdate,
        });
      } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
          error: "Failed to process message",
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  );

  /**
   * GET /api/chat/history/:entityId
   * Get conversation history
   */
  app.get("/api/chat/history/:entityId", async (req, res) => {
    if (!db) {
      return res.status(503).json({ error: "Database not configured" });
    }

    const { entityId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;

    const history = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.entityId, entityId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);

    res.json(history.reverse());
  });

  const httpServer = createServer(app);
  return httpServer;
}
```

### Test Chat Endpoint

```bash
# Start server
npm run dev

# Test chat (replace with actual auth token)
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "entityId": "test-entity-id",
    "message": "Hello, are you there?"
  }'
```

---

## Fix #6: Set Up Database Migrations

**Issue**: No migration strategy for schema changes
**Severity**: 🟡 HIGH
**Time**: 30 minutes

### Install Drizzle Kit

```bash
npm install --save-dev drizzle-kit
```

### Create drizzle.config.ts

```typescript
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not found in environment');
}

export default {
  schema: './shared/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
```

### Add Migration Scripts to package.json

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Generate Initial Migration

```bash
# Generate migration from schema
npm run db:generate

# Apply migration to database
npm run db:migrate

# Or push schema directly (dev only)
npm run db:push
```

### Create Migration Procedure Document

```bash
# server/db/MIGRATION_GUIDE.md
```

```markdown
# Database Migration Procedures

## Development

```bash
# 1. Make changes to shared/schema.ts
# 2. Generate migration
npm run db:generate

# 3. Review generated SQL in drizzle/migrations/
# 4. Apply migration
npm run db:migrate
```

## Production

```bash
# 1. Test migration on staging first
DATABASE_URL=$STAGING_DB npm run db:migrate

# 2. Verify schema
npm run db:studio

# 3. If successful, apply to production
DATABASE_URL=$PRODUCTION_DB npm run db:migrate

# 4. Backup first!
pg_dump $PRODUCTION_DB > backup-$(date +%Y%m%d).sql
```
```

---

## Fix #7: Set Up Smart Contract Deployment

**Issue**: Contract not deployable - no Hardhat config
**Severity**: 🟡 HIGH
**Time**: 45 minutes

### Create hardhat.config.js

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./contracts/test",
    cache: "./contracts/cache",
    artifacts: "./contracts/artifacts",
  },
};
```

### Create contracts/scripts/deploy.js

```javascript
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying ManInTheBox with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Get treasury address from env or use deployer
  const treasuryAddress = process.env.TREASURY_ADDRESS || deployer.address;
  console.log("Treasury address:", treasuryAddress);

  // Deploy contract
  const ManInTheBox = await hre.ethers.getContractFactory("ManInTheBox");
  const mitb = await ManInTheBox.deploy(treasuryAddress);

  await mitb.waitForDeployment();

  const address = await mitb.getAddress();

  console.log("ManInTheBox deployed to:", address);
  console.log("\n📋 Next steps:");
  console.log(`1. Verify on Etherscan: npx hardhat verify --network ${hre.network.name} ${address} ${treasuryAddress}`);
  console.log(`2. Add to .env: NFT_CONTRACT_ADDRESS=${address}`);
  console.log(`3. Mint NFT (optional): See RESET_PROCEDURE.md\n`);

  // Optional: Mint immediately if specified
  if (process.env.INITIAL_OWNER && process.env.INITIAL_TOKEN_URI) {
    console.log("Minting NFT to:", process.env.INITIAL_OWNER);
    const tx = await mitb.mint(
      process.env.INITIAL_OWNER,
      process.env.INITIAL_TOKEN_URI
    );
    await tx.wait();
    console.log("NFT minted! Transaction:", tx.hash);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Create contracts/test/ManInTheBox.test.js

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ManInTheBox", function () {
  let mitb;
  let owner;
  let treasury;
  let buyer;

  beforeEach(async function () {
    [owner, treasury, buyer] = await ethers.getSigners();

    const ManInTheBox = await ethers.getContractFactory("ManInTheBox");
    mitb = await ManInTheBox.deploy(treasury.address);
    await mitb.waitForDeployment();
  });

  it("Should mint the NFT successfully", async function () {
    await mitb.mint(owner.address, "ipfs://test");

    expect(await mitb.isMinted()).to.equal(true);
    expect(await mitb.ownerOf(1)).to.equal(owner.address);
  });

  it("Should prevent minting twice", async function () {
    await mitb.mint(owner.address, "ipfs://test");

    await expect(
      mitb.mint(buyer.address, "ipfs://test2")
    ).to.be.revertedWith("NFT already minted");
  });

  it("Should allow owner to burn NFT", async function () {
    await mitb.mint(owner.address, "ipfs://test");
    await mitb.burn(1);

    expect(await mitb.isBurned()).to.equal(true);
  });

  it("Should handle knowledge purchases", async function () {
    await mitb.mint(owner.address, "ipfs://test");

    await expect(
      mitb.connect(buyer).purchaseKnowledge("philosophy", {
        value: ethers.parseEther("0.1")
      })
    ).to.emit(mitb, "KnowledgePurchased");
  });

  it("Should grant and revoke observer tokens", async function () {
    await mitb.mint(owner.address, "ipfs://test");

    await expect(
      mitb.grantObserverToken(buyer.address, "video_stream")
    ).to.emit(mitb, "ObserverTokenGranted");

    await expect(
      mitb.revokeObserverToken(buyer.address)
    ).to.emit(mitb, "ObserverTokenRevoked");
  });
});
```

### Deploy to Testnet

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia DEPLOYED_ADDRESS TREASURY_ADDRESS
```

---

## Fix #8: Set Up Testing Framework

**Issue**: No testing framework configured
**Severity**: 🟡 HIGH
**Time**: 30 minutes

### Create vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
      '@': path.resolve(__dirname, './server'),
    },
  },
});
```

### Create tests/setup.ts

```typescript
import { config } from 'dotenv';
import { beforeAll, afterAll } from 'vitest';

// Load test environment
config({ path: '.env.test' });

beforeAll(async () => {
  console.log('🧪 Test suite starting...');
});

afterAll(async () => {
  console.log('✅ Test suite complete');
});
```

### Create .env.test

```bash
NODE_ENV=test
DATABASE_URL=postgresql://test:test@localhost:5432/mitb_test
ANTHROPIC_API_KEY=test-key
ENABLE_BLOCKCHAIN=false
ENABLE_REAL_TIME=false
```

### Add Test Scripts to package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage

# With UI
npm run test:ui
```

---

## Fix #9: Add Error Monitoring

**Issue**: No error tracking in production
**Severity**: 🟠 MEDIUM
**Time**: 20 minutes

### Install Sentry

```bash
npm install @sentry/node
```

### Create server/monitoring/sentry.ts

```typescript
import * as Sentry from '@sentry/node';
import { config } from '../config';
import type { Express } from 'express';

export function initializeSentry(app: Express) {
  if (!process.env.SENTRY_DSN) {
    console.warn('⚠️  Sentry not configured - error monitoring disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: config.NODE_ENV,
    tracesSampleRate: config.NODE_ENV === 'production' ? 0.1 : 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
  });

  // Request handler must be first
  app.use(Sentry.Handlers.requestHandler());

  // Tracing handler
  app.use(Sentry.Handlers.tracingHandler());

  console.log('✅ Sentry initialized');
}

export function addSentryErrorHandler(app: Express) {
  // Error handler must be last
  app.use(Sentry.Handlers.errorHandler());
}

export { Sentry };
```

### Update server/index.ts

```typescript
import { initializeSentry, addSentryErrorHandler } from './monitoring/sentry';

// ... after app creation
initializeSentry(app);

// ... before starting server, after routes
addSentryErrorHandler(app);
```

---

## Fix #10: Complete Observer Token System

**Issue**: Observer system incomplete in backend
**Severity**: 🟠 MEDIUM
**Time**: 30 minutes

### Create server/routes/observers.ts

```typescript
import type { Express } from 'express';
import { db } from '../db';
import { observerTokens } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { requireWeb3Auth, requireRole, type AuthenticatedRequest } from '../auth/web3-auth';

export function registerObserverRoutes(app: Express) {
  /**
   * POST /api/observers/grant
   * Grant observer token (creator only)
   */
  app.post(
    '/api/observers/grant',
    requireWeb3Auth,
    requireRole('creator'),
    async (req: AuthenticatedRequest, res) => {
      if (!db) {
        return res.status(503).json({ error: 'Database not configured' });
      }

      const { entityId, observerAddress, accessLevel } = req.body;

      if (!entityId || !observerAddress || !accessLevel) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const [token] = await db.insert(observerTokens).values({
          entityId,
          observerAddress,
          accessLevel,
          grantedBy: req.wallet!.address,
          isActive: true,
        }).returning();

        // Broadcast to WebSocket
        const wsManager = app.get('wsManager');
        if (wsManager) {
          wsManager.broadcastToEntity(entityId, {
            type: 'OBSERVER_GRANTED',
            payload: { observerAddress, accessLevel },
          });
        }

        res.json(token);
      } catch (error) {
        console.error('Error granting observer token:', error);
        res.status(500).json({ error: 'Failed to grant access' });
      }
    }
  );

  /**
   * POST /api/observers/revoke
   * Revoke observer token (creator only)
   */
  app.post(
    '/api/observers/revoke',
    requireWeb3Auth,
    requireRole('creator'),
    async (req: AuthenticatedRequest, res) => {
      if (!db) {
        return res.status(503).json({ error: 'Database not configured' });
      }

      const { entityId, observerAddress } = req.body;

      if (!entityId || !observerAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        await db
          .update(observerTokens)
          .set({
            isActive: false,
            revokedAt: new Date(),
          })
          .where(
            and(
              eq(observerTokens.entityId, entityId),
              eq(observerTokens.observerAddress, observerAddress)
            )
          );

        // Broadcast to WebSocket
        const wsManager = app.get('wsManager');
        if (wsManager) {
          wsManager.broadcastToEntity(entityId, {
            type: 'OBSERVER_REVOKED',
            payload: { observerAddress },
          });
        }

        res.json({ success: true });
      } catch (error) {
        console.error('Error revoking observer token:', error);
        res.status(500).json({ error: 'Failed to revoke access' });
      }
    }
  );

  /**
   * GET /api/observers/:entityId
   * List all observers for entity
   */
  app.get('/api/observers/:entityId', async (req, res) => {
    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { entityId } = req.params;

    const observers = await db
      .select()
      .from(observerTokens)
      .where(
        and(
          eq(observerTokens.entityId, entityId),
          eq(observerTokens.isActive, true)
        )
      );

    res.json(observers);
  });
}
```

### Update server/routes.ts to Include Observer Routes

```typescript
import { registerObserverRoutes } from './routes/observers';

export function registerRoutes(app: Express): Server {
  // ... existing routes ...

  // Register observer routes
  registerObserverRoutes(app);

  // ... rest of function ...
}
```

---

## Verification Checklist

After completing all fixes:

- [ ] All dependencies installed successfully
- [ ] Config handles missing environment variables gracefully
- [ ] WebSocket server initializes on startup
- [ ] Database queries work (test with test-db.ts script)
- [ ] Chat endpoint integrated with personality engine
- [ ] Migrations generated and applied
- [ ] Smart contract compiles and tests pass
- [ ] Vitest runs successfully
- [ ] Error monitoring initialized (if Sentry DSN provided)
- [ ] Observer token system functional

---

## Final Integration Test

```bash
# 1. Start server
npm run dev

# 2. Check health endpoint
curl http://localhost:5000/api/health

# Expected: All services showing status

# 3. Test WebSocket
npx wscat -c ws://localhost:5000

# Expected: Connection successful

# 4. Run unit tests
npm test

# Expected: All tests pass

# 5. Run smart contract tests
npx hardhat test

# Expected: All contract tests pass

# 6. Check database
npm run db:studio

# Expected: All tables exist
```

---

## Next Steps

Once all fixes are complete:

1. Read **TESTING_GUIDE.md** for comprehensive testing procedures
2. Read **RESET_PROCEDURE.md** for NFT preparation
3. Read **DEPLOYMENT_CHECKLIST.md** for production deployment
4. Begin thorough testing phase

---

**Estimated Total Time for All Fixes**: 4-6 hours

Remember: Test each fix individually before moving to the next. Don't rush - this system is complex and needs careful integration.
