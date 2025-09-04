const { ethers, network, run } = require("hardhat")
const { saveAddress } = require("../show-address.js")

async function main(params) {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract....")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const contractAddress = await simpleStorage.getAddress()
    console.log("Contract deployed! The Address is: ", contractAddress)
    // 保存合约地址
    saveAddress(network.name, contractAddress)
    // 11155111 for sepolia network
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(contractAddress, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is ${updatedValue}`)
}

async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        console.error(error)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("error", error)
        process.exit(1)
    })
