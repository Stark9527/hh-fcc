const { ethers } = require("ethers")
const fs = require("fs-extra")
const { exec } = require('shelljs')
async function compile(args) {
    const content = fs.readFileSync('./SimpleStorage.sol', 'utf8')
    const jsonData = {
        language: 'Solidity',
        sources: {
            'SimpleStorage.sol': {
                content
            }
        },
        settings: {
            evmVersion: 'london',
            outputSelection: {
                "*": {
                    "*": ["abi", "evm.bytecode"]
                }
            }
        }
    }
    await fs.writeJson(__dirname + '/input.json', jsonData)
    exec('npx solcjs --standard-json < input.json > output.json')
}

compile()
