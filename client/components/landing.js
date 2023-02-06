import React, { useEffect, useState } from "react"
import Connect from '../components/connect.js'
import Address from '../components/address.js'



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
            </div>

          ) : (            
              <Connect setUserAddress={ setUserAddress }/>
          )   }
            
      </div>
      )

}