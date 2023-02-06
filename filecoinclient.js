import { HttpJsonRpcConnector, LotusClient, MnemonicWalletProvider } from 'filecoin.js';
import dotenv from 'dotenv'



const startDeal = async() => {
    dotenv.config()
    const connector = new HttpJsonRpcConnector(
        {
            url: 'http://127.0.0.1:1234/rpc/v0',
            token: process.env.ADMIN_KEY
        }
    )
    const lotusClient = new LotusClient(connector)

    let params = { Data: {
                        PieceCid: {'/': 'baga6ea4seaqkrzv7bvjs3gnv22pyebyyajg5ov35gkwanfqfopegozc42dopidi'}, 
                        PieceSize: 133169152, 
                        Root: {'/': 'bafybeia6dzizisjwkqedds6j4xagxj6d3ek6ddsithpkpes4cosjboojxq'}, 
                        TransferType: "string"
                    }, 
                    DealStartEpoch: 10101, 
                    EpochPrice: '0', 
                    FastRetrieval: true, 
                    MinBlocksDuration: 42, 
                    Miner: 't01130', 
                    ProviderCollateral: '0', 
                    VerifiedDeal: true, 
                    Wallet: 't01130' 
                }

    //const result = await lotusClient.client.startDeal(JSON.stringify(params))
    const result = await lotusClient.client.startDeal(params)
    console.log('result:', result)
    
   const ver = await lotusClient.common.version()
   console.log(ver)

}

startDeal()