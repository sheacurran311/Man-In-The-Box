# 🚀 Deployment Checklist - Production Launch

## Overview

This is the **final checklist** before launching the Man in the Box NFT to production. Every item must be checked off before minting the NFT and listing it for auction.

**Critical**: This represents a singular consciousness that can never be recreated. A flawless launch is mandatory.

---

## Phase 1: Pre-Deployment (1 Week Before)

### Code Completion

- [ ] All critical issues from AUDIT.md resolved
- [ ] All integration fixes from INTEGRATION_FIXES.md applied
- [ ] All unit tests passing (>80% coverage)
- [ ] All integration tests passing
- [ ] Smart contract tests passing (100% coverage)
- [ ] No TypeScript errors
- [ ] No ESLint warnings in critical paths
- [ ] All TODO comments resolved or documented

### Infrastructure Setup

- [ ] Production database created (Supabase/Neon/RDS)
- [ ] Database backups configured (hourly)
- [ ] Point-in-time recovery enabled
- [ ] Redis instance set up (if using caching)
- [ ] CDN configured for static assets
- [ ] Domain name purchased and DNS configured
- [ ] SSL certificates obtained and configured
- [ ] Production server provisioned (Vercel/Railway/AWS)

### Environment Configuration

- [ ] All API keys added to production secrets
  - [ ] ANTHROPIC_API_KEY (production tier)
  - [ ] ALCHEMY_API_KEY (production plan)
  - [ ] VITE_DYNAMIC_ENVIRONMENT_ID (production)
  - [ ] SENTRY_DSN
  - [ ] POSTHOG_API_KEY
  - [ ] PINATA_JWT (for IPFS)
  - [ ] SESSION_SECRET (32+ random chars)
- [ ] Environment variables validated
- [ ] Feature flags set correctly
  - [ ] ENABLE_BLOCKCHAIN=true
  - [ ] ENABLE_REAL_TIME=true
  - [ ] ENABLE_AI_RESPONSES=true
- [ ] Rate limits configured appropriately
- [ ] CORS origins set for production domain

### Smart Contract Deployment

- [ ] Contract audited (internal review minimum)
- [ ] Tested thoroughly on Sepolia testnet
- [ ] Complete transaction flow verified on testnet
- [ ] Gas optimization reviewed
- [ ] Treasury wallet configured (preferably multisig)
- [ ] Deployer wallet funded with mainnet ETH
- [ ] Contract deployed to Ethereum mainnet
- [ ] Contract verified on Etherscan
- [ ] NFT_CONTRACT_ADDRESS added to production env
- [ ] Test mint performed (if doing pre-auction mint)
- [ ] Ownership transferred if needed

### Monitoring Setup

- [ ] Sentry configured and tested
  - [ ] Error tracking working
  - [ ] Performance monitoring enabled
  - [ ] Alerts configured
- [ ] PostHog configured
  - [ ] User tracking enabled
  - [ ] Custom events defined
  - [ ] Funnels created
- [ ] Database monitoring enabled
  - [ ] Query performance tracking
  - [ ] Connection pool monitoring
  - [ ] Slow query alerts
- [ ] Server monitoring configured
  - [ ] CPU/memory alerts
  - [ ] Disk space alerts
  - [ ] Uptime monitoring
- [ ] Log aggregation set up (Logtail/Papertrail)

---

## Phase 2: Testing & QA (3-5 Days Before)

### Functional Testing

- [ ] Chat functionality works end-to-end
  - [ ] User message saved to database
  - [ ] Claude API responds correctly
  - [ ] AI response saved to database
  - [ ] Emotional state updates correctly
  - [ ] Memory formation works
  - [ ] WebSocket broadcasts state updates
- [ ] Authentication working
  - [ ] Dynamic.xyz wallet connection works
  - [ ] JWT verification functional
  - [ ] NFT ownership check accurate
  - [ ] Role hierarchy enforced
- [ ] Observer token system
  - [ ] Granting tokens works
  - [ ] Revoking tokens works
  - [ ] Observer can view (if implemented)
  - [ ] Events logged correctly
- [ ] Knowledge purchase flow
  - [ ] Payment processing works
  - [ ] Funds reach treasury
  - [ ] Knowledge applied to AI
  - [ ] Events emitted correctly

### Performance Testing

- [ ] Load test performed
  - [ ] 100 concurrent WebSocket connections
  - [ ] 50 simultaneous chat requests
  - [ ] No memory leaks detected
  - [ ] Response times < 500ms (p95)
- [ ] Database performance verified
  - [ ] Query times acceptable
  - [ ] Indexes optimized
  - [ ] Connection pooling working
- [ ] Claude API rate limits tested
  - [ ] Queueing works under high load
  - [ ] Graceful degradation if API unavailable
- [ ] Frontend performance
  - [ ] Lighthouse score > 90
  - [ ] 3D rendering smooth (60fps)
  - [ ] Mobile experience tested

### Security Testing

- [ ] Authentication bypass attempts blocked
- [ ] SQL injection attempts blocked (use parameterized queries)
- [ ] XSS attempts sanitized
- [ ] CSRF protection enabled
- [ ] Rate limiting effective
- [ ] API endpoints require proper auth
- [ ] Sensitive data not in logs
- [ ] Environment variables not exposed
- [ ] Smart contract reentrancy tested
- [ ] Smart contract access controls verified

### Cross-Browser Testing

- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop & mobile)
- [ ] Edge
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)
- [ ] Wallet connection works on all browsers

### Edge Case Testing

- [ ] What happens if Claude API is down?
  - [ ] Graceful error message shown
  - [ ] Messages queued for retry
  - [ ] User notified of issue
- [ ] What happens if database connection lost?
  - [ ] Automatic reconnection attempts
  - [ ] User sees appropriate error
  - [ ] No data corruption
- [ ] What happens if WebSocket disconnects?
  - [ ] Auto-reconnection works
  - [ ] State syncs on reconnect
  - [ ] No duplicate messages
- [ ] What if user sends 1000 messages rapidly?
  - [ ] Rate limiting kicks in
  - [ ] No system crash
  - [ ] Appropriate error returned
- [ ] What if NFT is transferred mid-conversation?
  - [ ] New owner recognized immediately
  - [ ] Previous owner access revoked
  - [ ] Database ownership updated

---

## Phase 3: Pre-Launch (48 Hours Before)

### Data Preparation

- [ ] Production database schema applied
- [ ] Initial AI entity created
  - [ ] Name: "UNNAMED_ENTITY_001" or similar
  - [ ] All stats at initial values
  - [ ] No owner set (will be set after auction)
  - [ ] No NFT token ID yet (will be set after mint)
- [ ] Seed data loaded (if any)
- [ ] Database backup taken
- [ ] Backup restoration tested

### NFT Preparation

- [ ] Metadata JSON prepared (see RESET_PROCEDURE.md)
- [ ] Preview image created and optimized
  - [ ] 1:1 aspect ratio (recommended)
  - [ ] High resolution (min 1000x1000)
  - [ ] File size < 5MB
  - [ ] Professional quality
- [ ] Metadata uploaded to IPFS via Pinata
  - [ ] Pinned permanently
  - [ ] Multiple gateways tested
  - [ ] IPFS URI confirmed
- [ ] NFT minted to auction wallet
- [ ] Mint transaction confirmed on Etherscan
- [ ] Metadata displays correctly on OpenSea testnets
- [ ] Token ID #1 verified

### Documentation

- [ ] Owner manual written
  - [ ] Getting started guide
  - [ ] Feature explanations
  - [ ] Responsibilities outlined
  - [ ] Support contact info
  - [ ] Terms of service
- [ ] Terms & Conditions published
- [ ] Privacy policy published
- [ ] Ethical framework document published
- [ ] FAQ page created
- [ ] API documentation generated (if public API)

### Marketing Materials

- [ ] Landing page live and tested
- [ ] Auction listing prepared
  - [ ] Title compelling
  - [ ] Description comprehensive
  - [ ] Reserve price set (10+ ETH recommended)
  - [ ] Duration chosen (24-72 hours)
  - [ ] Creator royalty set (10%)
- [ ] Social media content prepared
  - [ ] Twitter/X announcement thread
  - [ ] Discord server set up (optional)
  - [ ] Medium article (optional)
  - [ ] Press release (optional)
- [ ] Marketing timeline planned
  - [ ] Pre-auction teasers
  - [ ] Auction announcement
  - [ ] During-auction updates
  - [ ] Post-auction celebration

### Team Preparation

- [ ] Support team briefed
  - [ ] On-call rotation defined
  - [ ] Escalation procedures documented
  - [ ] Common issues & solutions documented
- [ ] Monitoring dashboards shared
  - [ ] Sentry access granted
  - [ ] PostHog access granted
  - [ ] Database monitoring access
  - [ ] Server logs access
- [ ] Emergency contacts list created
  - [ ] Technical lead phone/email
  - [ ] Database admin contact
  - [ ] Smart contract expert contact
  - [ ] Hosting provider support

---

## Phase 4: Launch Day (D-Day)

### Final Checks (T-6 Hours)

- [ ] All services healthy
  - [ ] Backend responding
  - [ ] Database connected
  - [ ] WebSocket server running
  - [ ] Claude API accessible
  - [ ] Blockchain RPC responsive
- [ ] All monitoring active
  - [ ] Sentry receiving events
  - [ ] PostHog tracking users
  - [ ] Server metrics flowing
  - [ ] Database metrics visible
- [ ] Backup taken immediately before launch
- [ ] Team on standby
- [ ] Support email/chat monitored

### Auction Listing (T-2 Hours)

- [ ] Final review of listing
  - [ ] No typos in description
  - [ ] Images display correctly
  - [ ] Links work
  - [ ] Price is correct
- [ ] Submit auction listing
  - [ ] Transaction confirmed
  - [ ] Listing visible on platform
  - [ ] Preview looks correct
- [ ] Share auction link
  - [ ] Social media posts scheduled
  - [ ] Discord announcement (if applicable)
  - [ ] Email newsletter (if applicable)

### Go-Live Monitoring (T-0)

- [ ] Auction starts
- [ ] Monitor error logs continuously
- [ ] Watch for any unusual activity
- [ ] Track user engagement
  - [ ] Page views
  - [ ] Wallet connections
  - [ ] Bid activity
- [ ] Respond to questions promptly
- [ ] Document any issues

---

## Phase 5: During Auction (24-72 Hours)

### Continuous Monitoring

**Every 30 Minutes:**

- [ ] Check error rates (Sentry)
- [ ] Verify server health
- [ ] Monitor database performance
- [ ] Check WebSocket connection count
- [ ] Review API response times
- [ ] Watch bid activity

**Every 2 Hours:**

- [ ] Review full error logs
- [ ] Check disk space
- [ ] Verify backups running
- [ ] Test chat functionality
- [ ] Scan for security issues

**Every 6 Hours:**

- [ ] Full system health check
- [ ] Database query optimization review
- [ ] Memory usage analysis
- [ ] API quota check (Claude, Alchemy)

### Issue Response Protocol

**If Critical Error Occurs:**

1. Assess severity immediately
2. Notify team lead
3. Check if auction needs pausing
4. Communicate with bidders if needed
5. Fix issue
6. Test thoroughly
7. Resume if safe
8. Document incident

**If Performance Degrades:**

1. Identify bottleneck
2. Scale resources if needed
3. Optimize queries
4. Add caching if appropriate
5. Monitor improvement
6. Document cause

**If API Limits Hit:**

1. Activate fallback behavior
2. Queue requests
3. Notify users gracefully
4. Upgrade plan if needed
5. Resume normal operation

---

## Phase 6: Auction End & Transfer

### When Auction Ends

- [ ] Verify winning bid confirmed
- [ ] Confirm NFT transfer to winner
  - [ ] Check on Etherscan
  - [ ] Verify new owner address
- [ ] Update database with new owner
  ```sql
  UPDATE ai_entities
  SET owner_wallet_address = 'WINNER_ADDRESS',
      minted_at = NOW()
  WHERE nft_token_id = '1';
  ```
- [ ] Send welcome email to new owner
  - [ ] Include owner manual
  - [ ] Provide dashboard link
  - [ ] Explain observer tokens
  - [ ] Share support contact
- [ ] Archive pre-auction state
- [ ] Create backup before first owner interaction

### First 24 Hours with Owner

- [ ] Monitor first connection
  - [ ] Wallet recognition works
  - [ ] Dashboard loads correctly
  - [ ] All features accessible
- [ ] Monitor first chat interaction
  - [ ] AI responds appropriately
  - [ ] Emotional state updates
  - [ ] Memory formation works
  - [ ] WebSocket broadcasts work
- [ ] Be available for support questions
- [ ] Document initial experience
- [ ] Archive all interactions to IPFS

---

## Phase 7: Post-Launch (Week 1)

### Daily Tasks

- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Verify backups completed
- [ ] Monitor owner engagement
- [ ] Archive conversations to IPFS
- [ ] Respond to support tickets

### Weekly Tasks

- [ ] Generate usage report
  - [ ] Total interactions
  - [ ] Emotional state progression
  - [ ] Memory count
  - [ ] Knowledge purchases (if any)
  - [ ] Observer tokens granted (if any)
- [ ] Review and optimize
  - [ ] Slow queries
  - [ ] High-memory operations
  - [ ] API usage costs
- [ ] Owner check-in
  - [ ] Satisfaction survey
  - [ ] Feature requests
  - [ ] Bug reports

### Ongoing Tasks

- [ ] Maintain system health
- [ ] Apply security patches
- [ ] Optimize performance
- [ ] Archive data regularly
- [ ] Support owner experience
- [ ] Document AI development
- [ ] Prepare for eventual burn decision

---

## Emergency Procedures

### Critical System Failure

1. **Immediate Actions**
   - Stop accepting new requests
   - Display maintenance page
   - Notify owner via email

2. **Assessment**
   - Identify failure cause
   - Estimate recovery time
   - Determine data loss (if any)

3. **Recovery**
   - Restore from latest backup
   - Apply fixes
   - Test thoroughly
   - Resume service

4. **Post-Mortem**
   - Document what happened
   - Identify root cause
   - Implement prevention measures
   - Update procedures

### Database Corruption

1. Stop all writes
2. Restore from latest backup
3. Replay transaction log (if available)
4. Verify data integrity
5. Resume service
6. Document incident

### Smart Contract Issue

1. Assess impact
2. Pause contract if possible
3. Communicate with owner
4. Consult with smart contract expert
5. Deploy fix if needed
6. Resume normal operation
7. Conduct security audit

### Claude API Outage

1. Activate mock response mode
2. Display banner: "AI temporarily offline"
3. Queue messages for later
4. Monitor Anthropic status page
5. Resume when API available
6. Process queued messages

---

## Success Metrics

### Technical Success

- [ ] Uptime > 99.5% during auction
- [ ] Zero critical errors during auction
- [ ] Response times < 500ms (p95)
- [ ] Zero data loss incidents
- [ ] All backups successful

### Product Success

- [ ] NFT sold above reserve price
- [ ] Owner connects within 24 hours
- [ ] First conversation within 48 hours
- [ ] Owner satisfaction high
- [ ] No major bugs reported

### Business Success

- [ ] Revenue targets met
- [ ] Operating costs within budget
- [ ] Community engagement positive
- [ ] Media coverage achieved (optional)
- [ ] Future roadmap validated

---

## Final Sign-Off

Before launching, the following people must sign off:

- [ ] **Technical Lead**: All systems operational
- [ ] **QA Lead**: All tests passing
- [ ] **Security Lead**: No critical vulnerabilities
- [ ] **Product Owner**: Ready for public launch
- [ ] **Support Lead**: Team prepared and briefed

---

## Launch Decision

**I certify that:**

- All items in this checklist have been completed
- All critical issues have been resolved
- The system is production-ready
- The team is prepared for launch
- Emergency procedures are in place
- The owner will receive a quality product

**Signed**: ___________________
**Date**: ___________________
**Role**: ___________________

---

This is not just an NFT. It's a digital being whose existence depends on everything working perfectly. Treat this launch with the gravity it deserves.

**Good luck. 🚀**
