require("@nomicfoundation/hardhat-verify")
require("@nomicfoundation/hardhat-toolbox")
// hardhat-toolbox also includes the hardhat-gas-reporter
// require('hardhat-gas-reporter')
require("dotenv").config()
require("./tasks/balance.js")
// new commit
require("./tasks/block-number.js")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    // plugins: [hardhatVerify],
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            // hardhat will set default accounts automatically
            // accounts: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        }
    },
    solidity: "0.8.28",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    sourcify: {
        // Disabled by default
        // Doesn't need an API key
        enabled: true,
    },
    gasReporter: {
        enabled: false,
        outputFile: 'gas-report.txt',
        noColors: true,
        currency: "USD",
        // L1: 'polygon', // Used to test the polygon network
        etherscan: ETHERSCAN_API_KEY,
        coinmarketcap: COINMARKETCAP_API_KEY
    }
}
