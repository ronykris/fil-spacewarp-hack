import React, { useEffect, useState } from "react"
import { startDeal } from "../../filecoinclient"

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

const isWalletConnected = async(onConnected) => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (accounts.length > 0) {
        const account = accounts[0]
        onConnected(account)
        return
      }
    }
  }
  
const onAddressChanged = async() => {
    const accounts = await window.ethereum.on('accountsChanged', (accounts) => {
      if (!accounts.length){
        window.location.reload()
      }
    })
  }


const Address = ({ userAddress }) => {    

    return (
        <span className="text-xl mt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>      
      
    );
  }  

const Connect = ({setUserAddress}) => {
    return (
      <button className="items-center bg-white rounded-lg font-medium p-4 m-8 shadow-lg" onClick={() => {connectWallet(setUserAddress)}}>
          <span>Connect Wallet</span>
      </button>
    )
  }

const StartDeal = () => {
    return (
      <button className="items-center bg-white rounded-lg font-medium p-4 m-8 shadow-lg" onClick={() => { startDeal()}}>
          <span>Start Deal</span>
      </button>
    )
}



export const Landing = () => {

    const [userAddress, setUserAddress] = useState("")

    useEffect(() => {
        isWalletConnected(setUserAddress)
      }, [userAddress])
    
      
      useEffect(() => {
        onAddressChanged(userAddress)
      }, [userAddress])
    

      return (
        <div className="flex flex-col bg-black justify-center items-center h-screen">
        <h1 className="text-6xl font-bold text-white">Repli
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Net</span>
        </h1>

        <h3 className="text-2xl mt-8 text-white mb-6">
          Your replication worker in Filecoin...
        </h3> 
      
          { userAddress ? (   
            <div>
              <div className="mb-6">
                <span className="text-xl text-white mt-8">Connected with </span><Address userAddress={ userAddress }/>                    
              </div>
              <StartDeal />  
            </div>

          ) : (            
              <Connect setUserAddress={ setUserAddress }/>
          )   }
            
      </div>
      )

}