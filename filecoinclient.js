import { HttpJsonRpcConnector, LotusClient, MnemonicWalletProvider } from 'filecoin.js';
import dotenv from 'dotenv'


export const startDeal = async() => {
    dotenv.config()
    const connector = new HttpJsonRpcConnector(
        {
            url: 'http://127.0.0.1:1234/rpc/v0',
            //url: 'https://api.hyperspace.node.glif.io/rpc/v1',
            token: process.env.ADMIN_KEY            
        }
    )
    const lotusClient = new LotusClient(connector)

    let params = { Data: {
                        PieceCid: {'/': 'baga6ea4seaqiancg35wh3bsaez2nzktr36bqgufckk2s5q6cnvto2fzjestxqla'}, 
                        PieceSize: 16256, 
                        //Root: {'/': 'bafybeia6dzizisjwkqedds6j4xagxj6d3ek6ddsithpkpes4cosjboojxq'}, 
                        Root: {'/': 'bafykbzacedcb27yfqplrtjemymkf2eu2at25lrgm3fx3mlrqrn3l2ozcnk6su'}, 
                        TransferType: "string"
                    }, 
                    //the startepoch needs to be after [now] + maybe 2h on t01129 or 8h for t01130
                    DealStartEpoch: 62799, //for t01130; Block Height: 61,711 (from filfox) + 8x120 
                    EpochPrice: '0',
                    FastRetrieval: true, 
                    MinBlocksDuration: 518500, //Duration of epoch, give a very low value to see what the min and max values are for the miner
                    Miner: 't01130', 
                    ProviderCollateral: '0', 
                    VerifiedDeal: true, 
                    Wallet: 't1qewhdeyk7hqlepcvnbedapsvie2p3moo6jmymfa'
                    
                }

    //const result = await lotusClient.client.startDeal(JSON.stringify(params))
    const result = await lotusClient.client.startDeal(params)
    console.log('result:', result)
    
   const ver = await lotusClient.common.version()
   console.log(ver)

}

startDeal()