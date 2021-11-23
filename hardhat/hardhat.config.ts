import "@nomiclabs/hardhat-etherscan";
require("@nomiclabs/hardhat-waffle");

const { infura_endpoint, mnemonic, ethersacn_key } = require("./secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  networks: {
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: {
        mnemonic: mnemonic,
      },
      gasPrice: 8000000000,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ad0f7d8b5f45447fa15576f4f2c0c0bf",
      accounts: {
        mnemonic: mnemonic,
      },
    },
  },
  etherscan: {
    apiKey: ethersacn_key,
  },
  paths: {
    artifacts: "../client/src/artifacts",
  },
  mocha: {
    timeout: 500000,
  },
};
//  hh verify --network rinkeby 0x4ADa53Ae29F1c135FBe27ae9F926FD63907B60c0
//  hh verify --network matic 0xa5D7BCBA1f6ae4F3B8e6ec8bBFce572E2d7042E6
//  hh run --network matic scripts/deploy-script.ts
//  hh run --network rinkeby scripts/deploy-script.ts
