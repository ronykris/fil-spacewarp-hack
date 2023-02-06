import React from 'react'

const connectWallet = async(onConnected) => {
    if (!window.ethereum) {
      alert("Get MetaMask!")
      return
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
  
    onConnected(accounts[0])
  }

export const Connect = ({setUserAddress}) => {
    return (
      <button className="items-center bg-white rounded-lg font-medium p-4 m-8 shadow-lg" onClick={() => {connectWallet(setUserAddress)}}>
          <span>Connect Wallet</span>
      </button>
    )
  }

  