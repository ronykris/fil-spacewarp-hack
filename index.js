import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { Multiaddr } from "multiaddr";

//const url = 'https://api.node.glif.io'
const url = 'wss://wss.node.glif.io/apigw/lotus/rpc/v0'
const provider = new NodejsProvider(url)
const client = new LotusRPC(provider, {schema: mainnet.fullNode})

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

ver()
//getChainhead()
//getMinerList()
//getMinerInfoList()
clientAsk('f01012')
