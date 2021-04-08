const { ethers } = require("ethers")
const zksync = require("zksync")

const main = async () => {
    const syncProvider = await zksync.getDefaultProvider("rinkeby") 
    const ethersProvider = await ethers.getDefaultProvider("rinkeby") 

//    let privateKey = "0x99592645e803ef40e5f7d8cf37555c541a3cf44cc60a7ad0b6737f2bdee1defa";
    let privateKey = "0x528080b1ba590d15e767e0518d8b8fd2126e65cf2158a2f4945161953bf86d76";
    let wallet = new ethers.Wallet(privateKey, ethersProvider);
    console.log(wallet.address);

    const syncWallet = await zksync.Wallet.fromEthSigner(wallet, syncProvider);

    // Deposit ether
    // const deposit = await syncWallet.depositToSyncFromEthereum({
    //     depositTo: syncWallet.address(),
    //     token: "ETH",
    //     amount: ethers.utils.parseEther("0.01"),
    // });

    // const depositReceipt = await deposit.awaitReceipt();
    // console.log(depositReceipt);

    //Unlock account
    let receipt;
    if (!(await syncWallet.isSigningKeySet())) {
        if ((await syncWallet.getAccountId()) == undefined) {
            throw new Error("Unknown account");
        }
        const changePubkey = await syncWallet.setSigningKey({ feeToken: "ETH", ethAuthType:"ECDSA" });
      
        receipt = await changePubkey.awaitReceipt();
        console.log("Unlock receipt: ", receipt)
    } else {
        console.log("Signing key already set")
    }

    //Get balance
    let committedETHBalance = await syncWallet.getBalance("ETH");
    committedETHBalance = ethers.utils.formatEther(committedETHBalance).toString()
    console.log("User deposited Ether : ", committedETHBalance)

    //Transfer ether
    const recipient = "0xa0df350d2637096571F7A701CBc1C5fdE30dF76A"
    const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("0.001"));

    const transfer = await syncWallet.syncTransfer({
        to: recipient,
        token: "ETH",
        amount,
    });

    const transferReceipt = await transfer.awaitReceipt();
    console.log("Transfer receipt: ", transferReceipt)

    const withdraw = await syncWallet.withdrawFromSyncToEthereum({
        ethAddress: wallet.address,
        token: "ETH",
        amount: ethers.utils.parseEther("0.0005"),
    });
    receipt = await withdraw.awaitVerifyReceipt();

    console.log("Withdraw receipt: ", receipt)
}

main()

