require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["e99ea98a10f427e1eac1b9b40fff07dd65670d1ab058cdf5fa3bc730265d2699"],
    },
  },
  etherscan: {
    apiKey: "ZMJ2USP1XXSG8RW7RB4Z8XHSS446UDBEEK",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
