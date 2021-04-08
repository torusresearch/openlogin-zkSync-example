import React from "react";
import { PageHeader, Button } from "antd";
import "./style.scss";
import { utils } from "ethers";

function AccountInfo({
  handleLogout,walletInfo, 
  handleDepositEthToZkSync, 
  handleWithDrawEthFromZkSync, 
  unlockZkSyncWallet, 
  refreshBalances 
}) {

 return (
    <div>
        <PageHeader
            className="site-page-header"
            title="Openlogin x zkSync"
            extra={[
                <Button key="1" type="primary" onClick={handleLogout}>
                Logout
                </Button>,
            ]}
        />
        <div className="container">
        <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
            <div style={{margin:20}}>
              Eth Wallet address: <i>{walletInfo?.ethAddress }</i>
            </div>
            <div style={{margin:20}}>
              ZkSync Wallet address: <i>{walletInfo?.zkSyncAddress }</i>
            </div>
            <div style={{margin:20}}>
              Eth chain Balance: <i>{(walletInfo && utils.formatEther(walletInfo.ethBal))}</i>
            </div>
           
            <div style={{margin:20}}>
              ZkSync Committed Balance: <i>{(walletInfo && utils.formatEther(walletInfo.zkSyncBal))}</i>
            </div>

            <div style={{margin:20}}>
              ZkSync Verified Balance: <i>{(walletInfo && utils.formatEther(walletInfo.zkSyncVerifiedBalance))}</i>
            </div>
            <hr/>
            <span>Private key:</span>
            <div style={{margin:20, maxWidth: 900, wordWrap: "break-word"}}>
               <span style={{margin: 20}}>{(walletInfo?.privateKey)}</span>
            </div>

            <button onClick={handleDepositEthToZkSync}>
                Deposit eth to zkSync
            </button>

            <button onClick={unlockZkSyncWallet}>
                Unlock zkSync wallet
            </button>

            <button onClick={handleWithDrawEthFromZkSync}>
                Withdraw eth from zkSync
            </button>

            <button onClick={refreshBalances}>
                Refresh balances
            </button>
          </div>
        </div>
  </div>
 )
}

export default AccountInfo;