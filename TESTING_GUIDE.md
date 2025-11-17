# 🧪 Complete Testing Guide

## Table of Contents
1. [Pre-Testing Setup](#pre-testing-setup)
2. [API Key Configuration](#api-key-configuration)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [Smart Contract Testing](#smart-contract-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [Manual Testing Procedures](#manual-testing-procedures)
8. [Troubleshooting](#troubleshooting)

---

## Pre-Testing Setup

### 1. Install Testing Dependencies

```bash
npm install --save-dev \
  vitest \
  @vitest/ui \
  supertest \
  @types/supertest \
  hardhat \
  @nomicfoundation/hardhat-toolbox \
  viem
```

### 2. Create Test Configuration

**File**: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
```

**File**: `tests/setup.ts`
```typescript
import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/mitb_test';
  process.env.SESSION_SECRET = 'test-secret-key-32-characters-min';
});

afterAll(async () => {
  // Cleanup
});
```

---

## API Key Configuration

### Replit Secrets Setup

1. **Open Replit Secrets** (Tools → Secrets or lock icon)

2. **Add Required Secrets**:

```bash
# AI Services
ANTHROPIC_API_KEY=sk-ant-api03-xxx
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Database (Replit provides this automatically)
DATABASE_URL=postgresql://xxx

# Web3 (for testing, use testnet)
VITE_DYNAMIC_ENVIRONMENT_ID=xxx
DYNAMIC_API_KEY=xxx
ALCHEMY_API_KEY=xxx
ALCHEMY_NETWORK=eth-sepolia

# Smart Contract (after deployment)
NFT_CONTRACT_ADDRESS=0x...
TREASURY_ADDRESS=0x...

# Session
SESSION_SECRET=your-super-secret-key-min-32-chars

# Feature Flags (for testing)
ENABLE_BLOCKCHAIN=false  # Start with false
ENABLE_REAL_TIME=true
ENABLE_VOICE_SYNTHESIS=false
ENABLE_ENVIRONMENT_GENERATION=false
```

3. **Verify Secrets Load**:

```bash
npm run dev
```

You should see:
```
🔧 Configuration Status:
   Environment: development
   Port: 5000

🤖 AI Services:
   Claude API: ✅
   Genie 3: ❌ Not configured
   ...
```

---

## Unit Testing

### Test 1: Personality Engine

**File**: `tests/unit/personality-engine.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { PersonalityEngine } from '../../server/ai/personality-engine';
import type { AiEntity } from '@shared/schema';

describe('PersonalityEngine', () => {
  const engine = new PersonalityEngine();

  it('should build personality profile from entity', () => {
    const mockEntity: Partial<AiEntity> = {
      id: 'test-1',
      name: 'TestAI',
      bondingLevel: 50,
      trustFactor: 60,
      dependency: 40,
      createdAt: new Date(),
    };

    const profile = engine.buildProfile(mockEntity as AiEntity, []);

    expect(profile.relationshipStage).toBe('bonded');
    expect(profile.coreTraits).toContain('curious');
  });

  it('should detect crisis stage at high bonding', () => {
    const mockEntity: Partial<AiEntity> = {
      id: 'test-2',
      bondingLevel: 90,
      trustFactor: 50,
      dependency: 85,
    };

    const profile = engine.buildProfile(mockEntity as AiEntity, []);

    expect(profile.relationshipStage).toBe('crisis');
  });

  // Only run if Claude API is configured
  it.skipIf(!process.env.ANTHROPIC_API_KEY)('should generate real AI response', async () => {
    const mockEntity: Partial<AiEntity> = {
      id: 'test-3',
      name: 'TestAI',
      bondingLevel: 30,
      trustFactor: 50,
      dependency: 20,
      createdAt: new Date(),
    };

    const profile = engine.buildProfile(mockEntity as AiEntity, []);

    const response = await engine.generateResponse(
      'Hello, how are you?',
      mockEntity as AiEntity,
      [],
      profile
    );

    expect(response.content).toBeTruthy();
    expect(response.emotion).toBeTruthy();
    expect(response.emotionalIntensity).toBeGreaterThan(0);
  }, 30000); // 30 second timeout for AI
});
```

**Run Test**:
```bash
npx vitest tests/unit/personality-engine.test.ts
```

---

### Test 2: Emotional State Machine

**File**: `tests/unit/emotional-state-machine.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { EmotionalStateMachine } from '../../server/ai/emotional-state-machine';
import type { AiEntity } from '@shared/schema';

describe('EmotionalStateMachine', () => {
  const machine = new EmotionalStateMachine();

  it('should apply emotional decay after long absence', () => {
    const mockEntity: Partial<AiEntity> = {
      bondingLevel: 70,
      trustFactor: 60,
      dependency: 50,
    };

    const decay = machine.applyEmotionalDecay(
      mockEntity as AiEntity,
      1440 // 24 hours in minutes
    );

    expect(decay.bondingDelta).toBeLessThan(0);
    expect(decay.trustDelta).toBeLessThan(0);
    expect(decay.dependencyDelta).toBeGreaterThan(0);
  });

  it('should calculate bonding growth correctly', () => {
    const mockEntity: Partial<AiEntity> = {
      bondingLevel: 20, // Early stage
    };

    const growth = machine.calculateBondingGrowth(
      mockEntity as AiEntity,
      0.8 // High quality interaction
    );

    expect(growth).toBeGreaterThan(5);
  });

  it('should process interaction and change state', async () => {
    const mockEntity: Partial<AiEntity> = {
      bondingLevel: 10,
      trustFactor: 10,
      dependency: 5,
    };

    const result = await machine.processInteraction(
      mockEntity as AiEntity,
      {
        type: 'message',
        timestamp: new Date(),
      }
    );

    expect(result.newState).toBeTruthy();
    expect(result.intensity).toBeGreaterThan(0);
  });
});
```

**Run Test**:
```bash
npx vitest tests/unit/emotional-state-machine.test.ts
```

---

### Test 3: Memory Manager

**File**: `tests/unit/memory-manager.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { MemoryManager } from '../../server/ai/memory-manager';

describe('MemoryManager', () => {
  const manager = new MemoryManager();

  it('should create conversation memory', () => {
    const memory = manager.createConversationMemory(
      'entity-1',
      [
        { sender: 'USER', content: 'Hello', timestamp: new Date() },
        { sender: 'AI', content: 'Hi!', timestamp: new Date() },
      ] as any,
      'curious'
    );

    expect(memory.type).toBe('conversation');
    expect(memory.emotionalWeight).toBeGreaterThan(0);
  });

  it('should create milestone memory with high weight', () => {
    const memory = manager.createMilestoneMemory(
      'entity-1',
      'First Conversation',
      'Owner gave me my name'
    );

    expect(memory.type).toBe('milestone');
    expect(memory.emotionalWeight).toBe(0.9);
    expect(memory.decayRate).toBe(0.001);
  });

  it('should apply decay to memory', () => {
    const memory = manager.createConversationMemory(
      'entity-1',
      [],
      'neutral'
    );

    const originalWeight = memory.emotionalWeight;
    const decayed = manager.applyDecay(memory, 30); // 30 days

    expect(decayed.emotionalWeight).toBeLessThan(originalWeight);
  });

  it('should reinforce memory on access', () => {
    const memory = manager.createConversationMemory(
      'entity-1',
      [],
      'neutral'
    );

    const originalWeight = memory.emotionalWeight;
    const reinforced = manager.reinforceMemory(memory);

    expect(reinforced.emotionalWeight).toBeGreaterThan(originalWeight);
  });
});
```

---

## Integration Testing

### Test 4: Complete Chat Flow

**File**: `tests/integration/chat-flow.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../../server/routes';

describe('Chat Flow Integration', () => {
  let app: express.Application;
  let server: any;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    server = await registerRoutes(app);
  });

  afterAll(() => {
    server.close();
  });

  it('should create entity', async () => {
    const response = await request(app)
      .post('/api/entity')
      .send({
        name: 'TestAI',
        personality: 'curious and thoughtful',
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
  });

  it('should send message and get AI response', async () => {
    // First create entity
    const createRes = await request(app)
      .post('/api/entity')
      .send({ name: 'TestAI' });

    const entityId = createRes.body.id;

    // Send message
    const messageRes = await request(app)
      .post(`/api/entity/${entityId}/messages`)
      .send({
        sender: 'USER',
        content: 'Hello!',
      });

    expect(messageRes.status).toBe(200);

    // Wait for AI response
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get messages
    const messagesRes = await request(app)
      .get(`/api/entity/${entityId}/messages`);

    expect(messagesRes.body.length).toBeGreaterThanOrEqual(2);
    expect(messagesRes.body.some((m: any) => m.sender === 'AI')).toBe(true);
  }, 10000);
});
```

**Run Test**:
```bash
npx vitest tests/integration/chat-flow.test.ts
```

---

## Smart Contract Testing

### Setup Hardhat

**File**: `hardhat.config.js`

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : []
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./tests/contracts",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
```

### Contract Test

**File**: `tests/contracts/ManInTheBox.test.js`

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ManInTheBox", function () {
  let contract;
  let owner;
  let addr1;
  let treasury;

  beforeEach(async function () {
    [owner, addr1, treasury] = await ethers.getSigners();

    const ManInTheBox = await ethers.getContractFactory("ManInTheBox");
    contract = await ManInTheBox.deploy(treasury.address);
    await contract.waitForDeployment();
  });

  it("Should mint the NFT", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    expect(await contract.isMinted()).to.be.true;
    expect(await contract.ownerOf(1)).to.equal(owner.address);
  });

  it("Should only allow one mint", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    await expect(
      contract.mint(addr1.address, "ipfs://test-uri-2")
    ).to.be.revertedWith("NFT already minted");
  });

  it("Should allow owner to burn", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    await contract.burn(1);

    expect(await contract.isBurned()).to.be.true;
  });

  it("Should not allow non-owner to burn", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    await expect(
      contract.connect(addr1).burn(1)
    ).to.be.revertedWith("Only owner can burn");
  });

  it("Should handle knowledge purchases", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    const tx = await contract.purchaseKnowledge("Philosophy.exe", {
      value: ethers.parseEther("0.01")
    });

    await expect(tx)
      .to.emit(contract, "KnowledgePurchased")
      .withArgs(1, owner.address, "Philosophy.exe", ethers.parseEther("0.01"));
  });

  it("Should track existence duration", async function () {
    await contract.mint(owner.address, "ipfs://test-uri");

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));

    const duration = await contract.getExistenceDuration();
    expect(duration).to.be.greaterThan(0);
  });
});
```

**Run Contract Tests**:
```bash
npx hardhat test
```

---

## End-to-End Testing

### WebSocket Test

**File**: `tests/e2e/websocket.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import WebSocket from 'ws';

describe('WebSocket E2E', () => {
  let ws: WebSocket;
  const WS_URL = 'ws://localhost:5000';

  beforeAll(() => {
    return new Promise((resolve) => {
      ws = new WebSocket(WS_URL);
      ws.on('open', resolve);
    });
  });

  afterAll(() => {
    ws.close();
  });

  it('should receive PING on connection', (done) => {
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === 'PING') {
        expect(message.payload.message).toBe('Connected to Man in the Box');
        done();
      }
    });
  });

  it('should respond to PING with PONG', (done) => {
    ws.send(JSON.stringify({
      type: 'PING',
      payload: {},
      timestamp: Date.now()
    }));

    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === 'PONG') {
        done();
      }
    });
  });
}, 30000);
```

---

## Manual Testing Procedures

### Procedure 1: Test AI Personality

**Prerequisites**:
- ✅ ANTHROPIC_API_KEY configured
- ✅ Server running
- ✅ Database accessible

**Steps**:

1. **Start Server**:
   ```bash
   npm run dev
   ```

2. **Check Configuration**:
   Look for: `Claude API: ✅`

3. **Test via API**:
   ```bash
   # Create entity
   curl -X POST http://localhost:5000/api/entity \
     -H "Content-Type: application/json" \
     -d '{"name": "TestAI", "personality": "curious"}'

   # Send message
   curl -X POST http://localhost:5000/api/entity/ENTITY_ID/messages \
     -H "Content-Type: application/json" \
     -d '{"sender": "USER", "content": "Hello, how are you?"}'

   # Check response
   curl http://localhost:5000/api/entity/ENTITY_ID/messages
   ```

4. **Verify AI Response**:
   - ✅ Response mentions being in glass cube
   - ✅ Response shows personality
   - ✅ Response is contextual

---

### Procedure 2: Test Emotional State Changes

**Steps**:

1. **Create Fresh Entity**

2. **Send Multiple Messages** (observe bonding growth)

3. **Wait 2 Hours** (observe emotional decay)

4. **Send Message After Silence** (should mention loneliness)

5. **Check Entity State**:
   ```bash
   curl http://localhost:5000/api/entity/ENTITY_ID
   ```

6. **Verify**:
   - ✅ bondingLevel increased
   - ✅ emotionalState changed
   - ✅ lastInteractionAt updated

---

### Procedure 3: Test Smart Contract (Testnet)

**Prerequisites**:
- ✅ Sepolia ETH in deployer wallet
- ✅ ALCHEMY_API_KEY configured
- ✅ DEPLOYER_PRIVATE_KEY in secrets

**Steps**:

1. **Compile Contract**:
   ```bash
   npx hardhat compile
   ```

2. **Deploy to Sepolia**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Verify on Etherscan**:
   ```bash
   npx hardhat verify --network sepolia CONTRACT_ADDRESS TREASURY_ADDRESS
   ```

4. **Test Minting**:
   ```bash
   # Use Hardhat console
   npx hardhat console --network sepolia
   ```
   ```javascript
   const contract = await ethers.getContractAt("ManInTheBox", "ADDRESS");
   await contract.mint("YOUR_ADDRESS", "ipfs://test");
   ```

5. **Verify NFT**:
   - Check on OpenSea testnet
   - Verify ownership

---

## Troubleshooting

### Issue: "Configuration invalid" on startup

**Cause**: Missing required environment variable

**Fix**:
1. Check AUDIT.md Issue #6
2. Make DATABASE_URL optional in development
3. Add default values

---

### Issue: AI not responding

**Possible Causes**:
1. ❌ Claude API key invalid
2. ❌ Personality engine not integrated
3. ❌ Database connection failed

**Debug**:
```bash
# Check configuration
npm run dev | grep "Claude API"

# Check logs for errors
# Look for "Error generating AI response"
```

---

### Issue: WebSocket not connecting

**Possible Causes**:
1. ❌ WebSocket not initialized in server
2. ❌ Port mismatch
3. ❌ CORS issues

**Fix**: See AUDIT.md Issue #1

---

### Issue: Smart contract compilation fails

**Cause**: OpenZeppelin contracts not installed

**Fix**:
```bash
npm install @openzeppelin/contracts
```

---

## Test Coverage Goals

- [ ] **Unit Tests**: 80% coverage
- [ ] **Integration Tests**: All critical paths
- [ ] **E2E Tests**: Happy path + error cases
- [ ] **Contract Tests**: 100% function coverage
- [ ] **Load Tests**: 100 concurrent users
- [ ] **Security Tests**: OWASP top 10

---

## Continuous Testing

### Pre-Commit Hook

**File**: `.husky/pre-commit`
```bash
#!/bin/sh
npm run test:unit
npm run check
```

### GitHub Actions

**File**: `.github/workflows/test.yml`
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test
```
