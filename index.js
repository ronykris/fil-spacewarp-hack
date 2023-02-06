import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { Multiaddr } from "multiaddr";
import axios from "axios";
import dotenv from "dotenv"

//const url = 'https://api.node.glif.io'
//const url = 'wss://wss.node.glif.io/apigw/lotus/rpc/v0'
const url = 'ws://127.0.0.1:1234/rpc/v0'
const provider = new NodejsProvider(url, {headers: {
    "authorization": `Bearer ${process.env.ADMIN_KEY}`,
  }},)
const client = new LotusRPC(provider, {schema: mainnet.fullNode})
//const client = new LotusRPC(provider, {schema: })

dotenv.config()

const ver = async () => {
    try {
        const version = await client.version()
        console.log('version:', version)
    } catch (e) {
        console.error(e)
    }
    //await client.destroy()
}

const getChainhead = async() => {
    try {        
        const chainHead = await client.chainHead()
        console.log(chainHead.Cids)        
        return chainHead.Cids
    } catch (e) {
        console.error(e)
    }
}

const getMinerList = async() => {
    try {
        //console.log(getChainhead())
        const minerList = await client.stateListMiners(await getChainhead())
        console.log('minerList:', minerList)
        console.log('minerList length:', minerList.length)
        return minerList
    } catch (e) {
        console.error(e)
    }
    //await client.destroy()
}

const getMinerInfo = async(miner) => {
    try {
        const minerInfo = await client.stateMinerInfo(miner, null)        
        console.log('Miner Info: ', minerInfo)
        const multiaddr = minerInfo.Multiaddrs
        let decodedAddr = []
        if (multiaddr){
            for ( const i of multiaddr){
                decodedAddr.push((new Multiaddr(Buffer.from(i, 'base64'))).toString())
            }
        }        
        console.log('Miner Locs:', decodedAddr.sort())
        return minerInfo
    } catch (e) {
        console.error(e)
    }
}

const getMinerInfoList = async() => {
    try {
        const minerList = await getMinerList()
        const minerInfoList = minerList.map(async(miner) => await getMinerInfo(miner))
        console.log('Miner Info List:', minerInfoList)
    } catch (e) {
        console.error(e)
    }
}

const clientAsk = async(miner) => {
    try {
        const minerInfo = await getMinerInfo(miner)
        const ask = await client.clientQueryAsk(minerInfo.PeerId, miner)
        console.log('Client Query Ask:', ask)

    } catch (e) {

    }
}


const importData = async(file) => {
    try {

        let data = {
            "id":1,
            "jsonrpc": "2.0",
            "method": "Filecoin.ClientImport",
            "params": [{
                    "IsCAR": false,
                    "Path": file
                }]
        }
        let options = {
            url: "http://127.0.0.1:1234/rpc/v0",
            method: "post",
            headers:
            { 
             "content-type": "text/plain",
             "authorization": `Bearer ${process.env.ADMIN_KEY}`
            },            
            body: JSON.stringify(data)
            
        };

        const importId = await axios.request(options)        
        console.log('import details', importId)
    } catch (e) {
        console.error(e)
    }
}

const startDeal = async() => {
    try {

        client.clientStartDeal()

    } catch (e) {
        console.error(e)
    }

}

const getMinerQuery = async(miner, filecid) => {
    try {
        const ask = await client.clientMinerQueryOffer(miner, {"/": filecid}, null)
        console.log(ask)
    } catch (e) {
        console.error(e)
    }
}



/*
const importData = async(file) => {
    try {

        const importId = await client.clientImport({Path: file, IsCAR: false})
        console.log('import details', importId)
    } catch (e) {
        console.error(e)
    }
}*/

//client.clientImport()

ver()
//getChainhead()
//getMinerList()
//getMinerInfoList()
//clientAsk('f01012')
//clientAsk('t04933')
//importData("data.bin")
getMinerInfo('t01130')
clientAsk('t01130')
getMinerQuery('t01130', 'bafykbzacedcb27yfqplrtjemymkf2eu2at25lrgm3fx3mlrqrn3l2ozcnk6su')