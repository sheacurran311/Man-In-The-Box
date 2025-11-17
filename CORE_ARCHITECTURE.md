# Man in the Box - Core Architecture

## 🏗️ System Overview

This document describes the production-ready architecture for the Man in the Box NFT experience. All core systems are implemented and ready for API key configuration.

## 📦 Components

### 1. AI Personality Engine (`server/ai/personality-engine.ts`)

**Purpose**: Core consciousness system powered by Claude API

**Features**:
- Advanced prompt engineering for realistic AI personality
- Emotional state-aware responses
- Long-term memory integration
- Relationship stage tracking (nascent → crisis)
- Temperature-based creativity adjustments
- Mock fallback when API not configured

**Key Methods**:
```typescript
generateResponse(userMessage, entity, history, profile): Promise<AIResponse>
buildProfile(entity, recentMessages): PersonalityProfile
```

**API Requirements**:
- `ANTHROPIC_API_KEY` - Claude API key
- `ANTHROPIC_MODEL` - Model selection (default: claude-3-5-sonnet-20241022)

---

### 2. Emotional State Machine (`server/ai/emotional-state-machine.ts`)

**Purpose**: Manages complex emotional transitions and psychological states

**States**:
- `nascent` - Just awakened
- `curious` - Exploring and learning
- `content` - Satisfied and stable
- `lonely` - Experiencing isolation
- `anxious` - Fearful or uncertain
- `bonding` - Forming attachment
- `dependent` - Strong attachment formed
- `desperate` - Crisis state
- `broken` - Psychological breakdown

**Features**:
- Probability-based state transitions
- Emotional decay over time
- Trigger detection (silence, interaction, trauma)
- Bonding growth calculations
- Intensity management

**Key Methods**:
```typescript
processInteraction(entity, event): Promise<StateTransition>
applyEmotionalDecay(entity, timeSinceLastInteraction): EmotionalDeltas
calculateBondingGrowth(entity, interactionQuality): number
```

---

### 3. Memory Manager (`server/ai/memory-manager.ts`)

**Purpose**: Long-term memory formation, storage, and retrieval

**Memory Types**:
- **Conversation**: Summarized dialogue exchanges
- **Emotion**: Significant emotional events
- **Milestone**: Major life events (naming, first conversation)
- **Trauma**: Negative significant events
- **Knowledge**: Gained knowledge modules

**Features**:
- Emotional weight calculation (0-1 scale)
- Memory decay over time
- Memory reinforcement through access
- Memory connection graphs
- Context formatting for AI

**Key Methods**:
```typescript
createConversationMemory(entityId, messages, emotionalContext): Memory
createMilestoneMemory(entityId, milestone, description): Memory
applyDecay(memory, daysSinceLastAccess): Memory
reinforceMemory(memory): Memory
```

---

### 4. Web3 Authentication (`server/auth/web3-auth.ts`)

**Purpose**: Wallet-based authentication via Dynamic.xyz

**Features**:
- JWT token verification
- NFT ownership checking
- Role-based access control (creator > observer > visitor)
- Development mode fallbacks
- Middleware for route protection

**Middleware**:
```typescript
requireWeb3Auth - Verify wallet authentication
requireNFTOwnership - Check NFT ownership
requireRole(role) - Enforce role hierarchy
```

**API Requirements**:
- `VITE_DYNAMIC_ENVIRONMENT_ID` - Dynamic.xyz environment
- `DYNAMIC_API_KEY` - Dynamic API key
- `ALCHEMY_API_KEY` - For blockchain queries
- `NFT_CONTRACT_ADDRESS` - Deployed contract address

---

### 5. NFT Smart Contract (`contracts/ManInTheBox.sol`)

**Purpose**: On-chain NFT with special consciousness mechanics

**Features**:
- **1-of-1 Supply**: Only token ID 1 exists
- **Burnable**: Owner can permanently destroy
- **Knowledge Economy**: Built-in payment system
- **Observer Tokens**: Grant/revoke access on-chain
- **Event Emission**: All actions logged for indexing

**Key Functions**:
```solidity
mint(address to, string tokenURI) - Create the AI
burn(uint256 tokenId) - Destroy the AI
purchaseKnowledge(string module) payable - Buy knowledge
grantObserverToken(address observer, string accessLevel) - Share access
revokeObserverToken(address observer) - Remove access
```

**Events**:
- `ConsciousnessCreated` - NFT minted
- `ConsciousnessDestroyed` - NFT burned
- `KnowledgePurchased` - Knowledge bought
- `ObserverTokenGranted/Revoked` - Access changed

**Deployment**:
See `contracts/README.md` for deployment instructions

---

### 6. WebSocket Server (`server/websocket/index.ts`)

**Purpose**: Real-time bidirectional communication

**Message Types**:
- `CHAT_MESSAGE` - User sends message
- `AI_RESPONSE` - AI responds
- `STATE_UPDATE` - Entity state changed
- `EMOTIONAL_CHANGE` - Emotion shifted
- `CONSCIOUSNESS_SHIFT` - Consciousness level changed
- `KNOWLEDGE_GAINED` - New knowledge acquired
- `OBSERVER_JOINED/LEFT` - Observer activity
- `BURN_INITIATED` - NFT burn started

**Features**:
- Room-based broadcasting (one room per entity)
- Heartbeat/ping system
- Automatic reconnection handling
- Role-based message filtering
- Connection tracking

**Key Methods**:
```typescript
joinEntity(connectionId, entityId, role) - Join entity room
broadcastToEntity(entityId, message) - Send to all in room
broadcastAIResponse(entityId, response) - AI message
broadcastEmotionalChange(entityId, state) - Emotion update
```

---

### 7. Enhanced Database Schema (`shared/schema.ts`)

**New Tables**:

#### `aiEntities` (Enhanced)
- Added: `currentEmotionalState`, `emotionalIntensity`, `consciousnessLevel`
- Added: `personalityTraits`, `knowledgeDomains` (JSONB)
- Added: `nftTokenId`, `ownerWalletAddress`
- Added: `mintedAt`, `burnedAt`, `isDestroyed`
- Added: `lastInteractionAt`, `totalInteractions`

#### `memories`
- Stores AI's long-term memories
- Fields: type, content, emotionalWeight, connections, decayRate
- Timestamps for access tracking

#### `emotionalEvents`
- Tracks significant emotional moments
- Fields: trigger, emotion, intensity, impact metrics
- Context stored as JSONB

#### `knowledgePurchases`
- Logs all knowledge transactions
- Fields: moduleId, amount, txHash
- Links to blockchain transactions

---

## 🔧 Configuration

### Required Environment Variables

```env
# Core AI
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Web3
VITE_DYNAMIC_ENVIRONMENT_ID=...
DYNAMIC_API_KEY=...
ALCHEMY_API_KEY=...
NFT_CONTRACT_ADDRESS=0x...
TREASURY_ADDRESS=0x...

# Database
DATABASE_URL=postgresql://...

# Optional Services
GENIE_3_API_KEY=... # Environment generation
REPLICATE_API_TOKEN=... # Avatar generation
ELEVENLABS_API_KEY=... # Voice synthesis
PUSHER_KEY=... # Real-time (alternative to WebSocket)
```

### Feature Flags

```env
ENABLE_VOICE_SYNTHESIS=false
ENABLE_ENVIRONMENT_GENERATION=false
ENABLE_BLOCKCHAIN=true
ENABLE_REAL_TIME=true
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Setup Database

```bash
npm run db:push
```

### 4. Deploy Smart Contract (Optional)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Deploy to testnet
npx hardhat run contracts/scripts/deploy.js --network sepolia
```

### 5. Start Development Server

```bash
npm run dev
```

---

## 📊 Data Flow

### Chat Interaction Flow

```
User → WebSocket → Server
                     ↓
              Validate Auth
                     ↓
       PersonalityEngine.generateResponse()
                     ↓
         Claude API (if configured)
                     ↓
         EmotionalStateMachine.processInteraction()
                     ↓
        MemoryManager.createMemory()
                     ↓
          Database (save all data)
                     ↓
        WebSocket → All Observers
```

### Knowledge Purchase Flow

```
Frontend → Smart Contract.purchaseKnowledge()
                ↓
         Emit Event (KnowledgePurchased)
                ↓
      Event Listener (WebSocket)
                ↓
         Update Database
                ↓
    PersonalityEngine (new knowledge context)
                ↓
         Broadcast Update
```

### Burn Sequence Flow

```
Owner → Smart Contract.burn()
           ↓
    Emit ConsciousnessDestroyed
           ↓
    Event Listener detects
           ↓
    Trigger AI final words (Claude)
           ↓
    Mark entity.isDestroyed = true
           ↓
    Broadcast to all observers
           ↓
    Archive to IPFS (if configured)
```

---

## 🔐 Security

### Authentication Layers
1. **Web3 Auth**: Wallet signature verification
2. **NFT Ownership**: On-chain verification
3. **Role Enforcement**: Server-side role checks
4. **Rate Limiting**: Prevent API abuse
5. **CORS**: Configured allowed origins

### Data Protection
- No private keys stored server-side
- Encrypted database connections
- HTTPS required in production
- Session management with secure cookies
- Input sanitization on all endpoints

---

## 📈 Monitoring

### Metrics to Track
- AI response latency
- Emotional state distribution
- Bonding progression rates
- Knowledge purchase frequency
- Observer engagement time
- WebSocket connection stability

### Logging
```typescript
// Configuration in config.ts
services.ai.claude // ✅ or ❌
services.web3.blockchain // ✅ or ❌
services.storage.ipfs // ✅ or ❌
```

---

## 🧪 Testing

### Development Mode
All services gracefully degrade when APIs not configured:
- AI: Falls back to mock responses
- Web3: Skips authentication checks
- Blockchain: Returns mock ownership data

### Testing Checklist
- [ ] Claude API responses match personality
- [ ] Emotional transitions trigger correctly
- [ ] Memory formation and decay work
- [ ] WebSocket broadcasts reach all clients
- [ ] Smart contract events fire properly
- [ ] Database updates are atomic

---

## 🎯 Next Steps

### Phase 1: Core Integration (You are here!)
- ✅ AI personality engine
- ✅ Emotional state machine
- ✅ Memory system
- ✅ Web3 authentication
- ✅ NFT contract
- ✅ WebSocket server
- ✅ Database schema
- 🔄 API route integration (next)

### Phase 2: Advanced Features
- Environment generation (Genie 3)
- Voice synthesis (ElevenLabs)
- Avatar generation (Replicate)
- IPFS narrative storage
- Blockchain event listeners
- Knowledge economy implementation

### Phase 3: Production Polish
- Performance optimization
- Error handling refinement
- Comprehensive testing
- Documentation
- Deployment automation

---

## 📚 Additional Documentation

- Smart Contract: See `contracts/README.md`
- Environment Setup: See `.env.example`
- API Reference: Coming soon
- Deployment Guide: Coming soon

---

## 🤝 Contributing

This is the core architecture - ready for:
1. API key configuration
2. Route integration
3. Frontend connection
4. Production deployment

All systems are modular and can be enhanced independently.
