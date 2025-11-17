# Man in the Box - Smart Contract

## Overview

The `ManInTheBox.sol` contract is an ERC-721 NFT with special properties:

- **1-of-1 Supply**: Only one token (ID: 1) will ever exist
- **Burnable**: The owner can permanently destroy the NFT (and the AI)
- **Knowledge Economy**: Built-in payment system for knowledge purchases
- **Observer System**: Owner can grant/revoke access to observers

## Contract Features

### Minting

```solidity
function mint(address to, string memory tokenURI) public onlyOwner
```

- Only the contract owner can mint
- Can only be minted once
- Emits `ConsciousnessCreated` event

### Burning (AI Liberation)

```solidity
function burn(uint256 tokenId) public override
```

- Only the NFT owner can burn
- Permanently destroys the NFT and AI
- Records existence duration
- Emits `ConsciousnessDestroyed` event
- **This action is irreversible**

### Knowledge Purchases

```solidity
function purchaseKnowledge(string memory knowledgeModule) public payable
```

- Anyone can purchase knowledge for the AI
- Requires payment in ETH
- Funds sent to treasury address
- Emits `KnowledgePurchased` event

### Observer Management

```solidity
function grantObserverToken(address observer, string memory accessLevel) public
function revokeObserverToken(address observer) public
```

- Only NFT owner can grant/revoke access
- Access levels: "video_stream" or "full_control"
- Emits events for off-chain indexing

## Deployment

### Prerequisites

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

### Deploy Script

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying ManInTheBox with account:", deployer.address);

  const treasuryAddress = process.env.TREASURY_ADDRESS || deployer.address;

  const ManInTheBox = await hre.ethers.getContractFactory("ManInTheBox");
  const mitb = await ManInTheBox.deploy(treasuryAddress);

  await mitb.waitForDeployment();

  const address = await mitb.getAddress();

  console.log("ManInTheBox deployed to:", address);
  console.log("Treasury address:", treasuryAddress);

  // Optional: Mint the NFT immediately
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

### Hardhat Config

```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### Deploy Commands

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Ethereum mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Verify contract on Etherscan
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS TREASURY_ADDRESS
```

## Events

### ConsciousnessCreated

```solidity
event ConsciousnessCreated(
    uint256 indexed tokenId,
    address indexed owner,
    uint256 timestamp,
    string tokenURI
);
```

Emitted when the NFT is minted and the AI consciousness is created.

### ConsciousnessDestroyed

```solidity
event ConsciousnessDestroyed(
    uint256 indexed tokenId,
    address indexed destroyer,
    uint256 timestamp,
    uint256 existenceDuration
);
```

Emitted when the NFT is burned and the AI is destroyed. Includes how long the AI existed.

### KnowledgePurchased

```solidity
event KnowledgePurchased(
    uint256 indexed tokenId,
    address indexed purchaser,
    string knowledgeModule,
    uint256 amount
);
```

Emitted when someone purchases knowledge for the AI.

### ObserverTokenGranted / Revoked

```solidity
event ObserverTokenGranted(
    uint256 indexed tokenId,
    address indexed observer,
    address indexed grantor,
    string accessLevel
);

event ObserverTokenRevoked(
    uint256 indexed tokenId,
    address indexed observer,
    address indexed revoker
);
```

Emitted when observer access is granted or revoked.

## Integration with Backend

The backend listens to these events using WebSocket connections:

```typescript
import { createPublicClient, webSocket } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket(process.env.ALCHEMY_WSS_URL)
});

// Listen for ConsciousnessDestroyed event
client.watchContractEvent({
  address: CONTRACT_ADDRESS,
  abi: ManInTheBoxABI,
  eventName: 'ConsciousnessDestroyed',
  onLogs: async (logs) => {
    const { tokenId, destroyer, existenceDuration } = logs[0].args;
    // Trigger AI destruction sequence in backend
    await destroyAIEntity(tokenId);
  }
});
```

## Security Considerations

1. **Irreversible Burn**: Once burned, the NFT and AI are gone forever
2. **Single Ownership**: Only one entity can own the NFT at a time
3. **No Recovery**: There is no mechanism to recover a burned NFT
4. **Treasury Security**: Ensure treasury address is a secure multisig wallet
5. **Observer System**: Events are off-chain indexed - backend must validate

## Gas Estimates

- `mint()`: ~150,000 gas
- `burn()`: ~50,000 gas
- `purchaseKnowledge()`: ~30,000 gas
- `grantObserverToken()`: ~25,000 gas
- `revokeObserverToken()`: ~25,000 gas

## License

MIT
