import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

import "@nomiclabs/hardhat-waffle"
import '@nomiclabs/hardhat-ethers'
// import "solidity-coverage";

import * as dotenv from 'dotenv'
dotenv.config()


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.SCAN_API_KEY
  },
  networks: {
    localhost: {
      url: "http://localhost:9650/ext/bc/C/rpc",
      chainId: 43112,
    },
    hardhat: {
      chainId: 31337,
      loggingEnabled: false,
      accounts: {
        count: 10,
        initialIndex: 0,
        mnemonic: "test test test test test test test test test test test junk",
        accountsBalance: "10000000000000000000000",
      },
    },
    testnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      chainId: 97,
      accounts: [process.env.PRIVATEKEY!]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [process.env.PRIVATEKEY!]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
};

export default config;
