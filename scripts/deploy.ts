const ethers = require("hardhat").ethers;

module.exports = { ethers };

async function main() {
  const Chumon = await ethers.getContractFactory("ChumonMarketplace");
  const chumon = await Chumon.deploy();

  const result = await chumon.deployed();
  console.log("Chumon deployed to:", result.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
