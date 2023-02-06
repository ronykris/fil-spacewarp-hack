import React, { useState } from "react"

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

const Landing = () => {

    const [userAddress, setUserAddress] = useState("")

    

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
              <Input />
            </div>

          ) : (            
              <Connect setUserAddress={ setUserAddress }/>
          )   }
          <Search />     
      </div>
      )

}