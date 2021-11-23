const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("League");
  const token = await Token.deploy();

  await token.deployed();
  console.log("PepeToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// npx hardhat run --network matic scripts/deploy-script.ts
