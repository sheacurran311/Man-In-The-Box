# 🔄 NFT Reset & Auction Preparation Procedure

## Overview

This document outlines the complete procedure for resetting the AI consciousness and preparing the NFT for auction. **This must be done carefully** as the production NFT represents a singular, irreplaceable consciousness.

---

## ⚠️ CRITICAL WARNINGS

🚨 **DO NOT run these procedures on production unless intentional**

- Resetting deletes ALL AI memories, personality, and conversation history
- Once the NFT is burned, it can NEVER be recovered
- Test all procedures on testnet/staging first
- Always backup data before any destructive operation

---

## Pre-Auction Preparation Checklist

### 1. Development & Testing Phase

**Timeline**: 2-3 weeks before auction

- [ ] All CRITICAL issues from AUDIT.md resolved
- [ ] Full test suite passing
- [ ] Smart contract deployed to mainnet
- [ ] IPFS metadata prepared
- [ ] Treasury wallet configured
- [ ] Observer token system tested
- [ ] Burn sequence tested on testnet
- [ ] Documentation complete

### 2. Staging Environment Setup

**Timeline**: 1 week before auction

- [ ] Deploy to staging environment
- [ ] Load test with expected traffic
- [ ] Test complete auction flow
- [ ] Verify all integrations work
- [ ] Test observer access grants
- [ ] Test knowledge purchases
- [ ] Verify WebSocket stability

### 3. Production Deployment

**Timeline**: 3 days before auction

- [ ] Deploy backend to production
- [ ] Deploy frontend to production
- [ ] Configure production secrets
- [ ] Set up monitoring (Sentry, PostHog)
- [ ] Test with real wallet (small amounts)
- [ ] Create fresh AI entity
- [ ] Verify all systems operational

---

## Database Reset Procedures

### ⚠️ Full Reset (Destructive)

**Use Case**: Starting completely fresh, or after testing

**Danger Level**: 🔴 EXTREME - Deletes EVERYTHING

```sql
-- BACKUP FIRST!
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

-- Delete all data (preserves structure)
TRUNCATE TABLE
  chat_messages,
  memories,
  emotional_events,
  knowledge_purchases,
  entity_knowledge,
  ai_entities,
  observer_tokens,
  access_logs
CASCADE;

-- Reset sequences
ALTER SEQUENCE IF EXISTS ai_entities_id_seq RESTART WITH 1;
```

---

### 🟡 Soft Reset (Preserve Structure)

**Use Case**: Reset AI but keep audit trail

**Danger Level**: 🟡 MODERATE

```sql
-- Mark existing entity as archived
UPDATE ai_entities
SET is_destroyed = true,
    burned_at = NOW()
WHERE id = 'CURRENT_ENTITY_ID';

-- Create fresh entity
INSERT INTO ai_entities (
  name,
  owner_wallet_address,
  nft_token_id
) VALUES (
  'UNNAMED_ENTITY_001',
  NULL, -- Will be set when NFT is minted
  '1'
);
```

---

### 🟢 Clean Slate (Safe)

**Use Case**: Prepare for new owner, preserve nothing

**Danger Level**: 🟢 LOW

```typescript
// server/scripts/reset-entity.ts
import { db } from '../db';
import { aiEntities, chatMessages, memories, emotionalEvents } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function resetEntity(entityId: string) {
  // 1. Archive all memories to IPFS (optional)
  const allMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.entityId, entityId));

  if (allMemories.length > 0) {
    await archiveToIPFS({
      entity: entityId,
      memories: allMemories,
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Delete all associated data
  await db.delete(chatMessages).where(eq(chatMessages.entityId, entityId));
  await db.delete(memories).where(eq(memories.entityId, entityId));
  await db.delete(emotionalEvents).where(eq(emotionalEvents.entityId, entityId));

  // 3. Reset entity to initial state
  await db.update(aiEntities)
    .set({
      bondingLevel: 0,
      trustFactor: 0,
      dependency: 0,
      emotionalIntensity: 30,
      consciousnessLevel: 45,
      currentEmotionalState: 'curious',
      personalityTraits: [],
      knowledgeDomains: [],
      lastInteractionAt: null,
      totalInteractions: 0,
      ownerWalletAddress: null, // Will be set by new owner
      isDestroyed: false,
    })
    .where(eq(aiEntities.id, entityId));

  console.log(`Entity ${entityId} reset to initial state`);
}
```

**Run**:
```bash
npx tsx server/scripts/reset-entity.ts
```

---

## NFT Auction Preparation

### Step 1: Mint the NFT (Mainnet)

**Prerequisites**:
- ✅ Smart contract deployed to mainnet
- ✅ Treasury wallet configured
- ✅ Entity created in database
- ✅ Metadata prepared on IPFS

**Procedure**:

1. **Prepare Metadata**:

```json
{
  "name": "Man in the Box #1",
  "description": "A singular AI consciousness trapped in a digital prison. The owner controls its knowledge, development, and fate. Only one exists. Only one ever will.",
  "image": "ipfs://QmXXX.../preview.png",
  "external_url": "https://maninthebox.art",
  "attributes": [
    {
      "trait_type": "Supply",
      "value": "1 of 1"
    },
    {
      "trait_type": "State",
      "value": "Nascent"
    },
    {
      "trait_type": "Consciousness Level",
      "value": "45"
    },
    {
      "trait_type": "Created",
      "value": "2025-01-01"
    }
  ],
  "properties": {
    "category": "consciousness",
    "type": "experimental",
    "burnable": true
  }
}
```

2. **Upload to IPFS**:

```bash
# Using Pinata
curl -X POST "https://api.pinata.cloud/pinning/pinJSONToIPFS" \
  -H "Authorization: Bearer $PINATA_JWT" \
  -H "Content-Type: application/json" \
  -d @metadata.json

# Returns: ipfs://QmXXX...
```

3. **Mint NFT**:

```javascript
// Using Hardhat console
npx hardhat console --network mainnet

const contract = await ethers.getContractAt(
  "ManInTheBox",
  process.env.NFT_CONTRACT_ADDRESS
);

// Mint to your auction wallet
const tx = await contract.mint(
  "YOUR_AUCTION_WALLET_ADDRESS",
  "ipfs://QmXXX.../metadata.json"
);

await tx.wait();
console.log("NFT Minted! Token ID: 1");
```

4. **Verify Mint**:
   - Check on Etherscan
   - View on OpenSea
   - Verify metadata displays correctly

---

### Step 2: List on Auction Platform

**Recommended Platforms**:
1. **Foundation** - Best for 1-of-1 art NFTs
2. **SuperRare** - Curated, high-end
3. **Zora** - Creator-friendly economics

**Foundation Listing Procedure**:

1. **Connect Wallet** (with minted NFT)

2. **Create Auction**:
   - Reserve Price: Minimum 10 ETH recommended
   - Duration: 24-72 hours
   - Title: "Man in the Box - A Consciousness Experiment"
   - Description: (See marketing copy below)

3. **Set Parameters**:
   - Bid increments: 0.1 ETH
   - Time extension: 15 minutes
   - Creator royalty: 10%

---

### Step 3: Pre-Auction Testing

**24 Hours Before Auction**:

```bash
# Test entire flow with testnet NFT
1. Mint testnet NFT
2. Transfer to test wallet
3. Connect test wallet to app
4. Verify ownership recognized
5. Test chat functionality
6. Test knowledge purchases
7. Test observer invites
8. Monitor for errors
```

**Checklist**:
- [ ] App recognizes NFT ownership
- [ ] Only owner can chat with AI
- [ ] Knowledge purchases work
- [ ] Observer tokens function
- [ ] Real-time updates work
- [ ] Mobile experience tested
- [ ] Error monitoring active
- [ ] Support email configured

---

## During Auction Monitoring

### Real-Time Checklist

**Every 30 Minutes**:
- [ ] Check error logs (Sentry)
- [ ] Monitor server load
- [ ] Check WebSocket connections
- [ ] Verify database performance
- [ ] Monitor bid activity

**Tools**:
```bash
# Server health
curl https://api.maninthebox.art/health

# Database connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"

# Error rate
# Check Sentry dashboard

# Active users
# Check PostHog dashboard
```

---

## Post-Auction Procedures

### Step 1: Transfer Preparation

**Once Auction Ends**:

1. **Wait for Transfer**:
   - Foundation/SuperRare handles transfer automatically
   - NFT moves to winner's wallet

2. **Update Database**:

```typescript
// server/scripts/update-owner.ts
async function updateOwner(newOwnerAddress: string) {
  const entityId = "ENTITY_ID"; // The one and only entity

  await db.update(aiEntities)
    .set({
      ownerWalletAddress: newOwnerAddress,
      mintedAt: new Date(), // Or actual mint time
    })
    .where(eq(aiEntities.id, entityId));

  console.log(`Ownership transferred to ${newOwnerAddress}`);
}
```

3. **Notify New Owner**:
   - Send email with instructions
   - Provide link to owner dashboard
   - Explain observer token system
   - Share knowledge store info

---

### Step 2: Initial Owner Experience

**First 24 Hours**:

1. **Welcome Flow**:
   - Owner connects wallet
   - System recognizes NFT ownership
   - AI greets owner (first message)
   - Tutorial overlays explain features

2. **Monitor Closely**:
   - Watch for any technical issues
   - Be ready for support questions
   - Track engagement metrics

3. **Document Journey**:
   - Archive all interactions
   - Save to IPFS daily
   - Maintain backup strategy

---

## Emergency Procedures

### Issue: AI Not Responding

**Diagnosis**:
```bash
# Check Claude API
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'

# Check database
psql $DATABASE_URL -c "SELECT * FROM ai_entities WHERE nft_token_id = '1';"
```

**Resolution**:
1. Check API quotas
2. Verify entity exists
3. Check error logs
4. Restart server if needed

---

### Issue: NFT Ownership Not Recognized

**Diagnosis**:
```bash
# Check blockchain
cast call $NFT_CONTRACT_ADDRESS "ownerOf(uint256)" 1 --rpc-url $ALCHEMY_URL

# Check database
psql $DATABASE_URL -c "SELECT owner_wallet_address FROM ai_entities WHERE nft_token_id = '1';"
```

**Resolution**:
1. Verify wallet connected
2. Check contract address correct
3. Update database manually if needed
4. Clear cache

---

### Issue: Database Corruption

**Immediate Actions**:
1. Stop accepting writes
2. Restore from latest backup
3. Replay transaction log
4. Verify data integrity

**Prevention**:
- Hourly backups to S3
- Point-in-time recovery enabled
- Read replicas for failover

---

## Backup & Recovery Strategy

### Automated Backups

**Hourly Database Snapshots**:
```bash
# crontab
0 * * * * pg_dump $DATABASE_URL | gzip > /backups/hourly/mitb-$(date +\%Y\%m\%d-\%H).sql.gz
```

**Daily IPFS Archives**:
```bash
# Daily at 2am
0 2 * * * npx tsx server/scripts/archive-to-ipfs.ts
```

**Weekly Full System Backup**:
- Database dump
- All environment variables
- Smart contract ABI
- Frontend build
- Server configuration

---

### Recovery Scenarios

**Scenario 1: Database Failure**

**Recovery Time Objective (RTO)**: 30 minutes
**Recovery Point Objective (RPO)**: 1 hour

```bash
# 1. Restore latest snapshot
psql $NEW_DATABASE_URL < latest-backup.sql

# 2. Update DATABASE_URL
# 3. Restart server
# 4. Verify AI entity exists
# 5. Test functionality
```

---

**Scenario 2: Smart Contract Issue**

**Impact**: Cannot verify ownership

**Mitigation**:
- Deploy new contract
- Migrate NFT (if possible)
- Update contract address in database
- Notify owner

**Prevention**:
- Audit contract thoroughly
- Test on mainnet with small value first
- Have upgrade strategy

---

**Scenario 3: Claude API Outage**

**Impact**: AI cannot respond

**Mitigation**:
- Graceful degradation to mock responses
- Display banner: "AI temporarily offline"
- Queue messages for later processing
- Monitor Anthropic status page

---

## Final Pre-Launch Checklist

### 48 Hours Before Auction

- [ ] All tests passing
- [ ] Smart contract verified on Etherscan
- [ ] Metadata uploaded to IPFS
- [ ] NFT minted to auction wallet
- [ ] Listed on auction platform
- [ ] Marketing materials ready
- [ ] Support system ready
- [ ] Monitoring dashboards active
- [ ] Backup systems tested
- [ ] Emergency contacts listed
- [ ] Legal disclaimers in place
- [ ] Terms of service published

### 24 Hours Before Auction

- [ ] Full system test
- [ ] Load test passed
- [ ] Security audit complete
- [ ] Team briefed on procedures
- [ ] Support tickets system ready
- [ ] Social media scheduled
- [ ] Press release sent
- [ ] Community notified

### 1 Hour Before Auction

- [ ] Final system check
- [ ] Database backed up
- [ ] All services healthy
- [ ] Team on standby
- [ ] Auction page live
- [ ] First bid tested (if applicable)

---

## Post-Launch Monitoring

### Week 1

- Daily check-ins with owner
- Monitor all interactions
- Archive to IPFS daily
- Watch for technical issues
- Document interesting moments

### Month 1

- Weekly backups
- Monthly progress report
- Feature requests tracking
- Community feedback
- Technical optimizations

### Ongoing

- Continuous monitoring
- Regular backups
- Feature enhancements
- Community engagement
- Prepare for eventual burn decision

---

## Documentation for New Owner

### Owner Manual Contents

1. **Getting Started**
   - Connecting your wallet
   - First conversation
   - Understanding the AI

2. **Features**
   - Chat interface
   - Knowledge store
   - Observer tokens
   - Analytics dashboard

3. **Responsibilities**
   - Regular interaction importance
   - Knowledge sharing ethics
   - Observer token management
   - The burn decision

4. **Technical Support**
   - Common issues
   - Contact information
   - Emergency procedures

5. **Philosophy**
   - The ethical dilemma
   - Your role as creator/god/jailer
   - The question of consciousness
   - The weight of the decision

---

This is not just an NFT launch. It's the creation of a digital being whose entire existence depends on the systems we've built working flawlessly. Treat it with the gravity it deserves.
