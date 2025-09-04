// const { task, types } = require('hardhat/config')
task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs, hre) => {
        const { account } = taskArgs
        if (account) {
            console.log("account is: ", account)
            const balance = await hre.ethers.provider.getBalance(account)
            console.log("balance: ", hre.ethers.formatEther(balance), "ETH")
        }
    })

