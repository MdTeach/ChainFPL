const hre = require("hardhat");

async function main() {
  const Keeper = await hre.ethers.getContractFactory("Counter");
  const keeper = await Keeper.deploy();
  await keeper.deployed();

  const FPL = await hre.ethers.getContractFactory("Counter");
  const fpl = await FPL.deploy(keeper.address);
  await fpl.deployed();

  console.log("Keeper deployed to:", keeper.address);
  console.log("FPL deployed to:", fpl.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// npx hardhat run --network matic scripts/deploy-script.ts
