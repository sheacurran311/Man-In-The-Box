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
