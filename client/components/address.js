import React from 'react'

const Address = ({ userAddress }) => {    

    return (
        <span className="text-xl mt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>      
      
    );
  }  

  export default Address