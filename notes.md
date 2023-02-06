
Refer: https://docs.filecoin.io/developers/infrastructure/how-tos/spin-up-a-lite-node/


1. First, let’s grab the head of the Filecoin network chain:

```
curl -X POST https://api.node.glif.io \
-H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "Filecoin.ChainHead", "id": 1, "params": []}'
```

2. Next, let’s try to create a new wallet. Since this is a privileged method, we need to supply our auth key eyJhbGc...:
```
curl -X POST '127.0.0.1:1234/rpc/v0' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.NHQdBlnV4QT2HNlVSvhIQKvp8bBGvM-NIZt3FmMkm48' \
--data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletNew","params":["secp256k1"]}' \
| jq
```
3. Set the new address as the default wallet for our lite-node:
```
curl -X POST '127.0.0.1:1234/rpc/v0' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.NHQdBlnV4QT2HNlVSvhIQKvp8bBGvM-NIZt3FmMkm48' \
--data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.WalletSetDefault","params":["t1qewhdeyk7hqlepcvnbedapsvie2p3moo6jmymfa"]}' \
| jq 
```

```
SimpleCoin deployed to: 0x5086B891fFf929591d6914b25E9145FfE7bC207f
FilecoinMarketConsumer deployed to: 0x21f8224E194577ec5F025b225b97d747eC8c120B
DealRewarder deployed to: 0x585904266eDdA0208418a2663b56209F6b9f4598
```

Refer : https://docs.filecoin.io/get-started/store-and-retrieve/store-data/
```
roger@roger:~/dev/filecoin$ lotus client import ../fil-spacewarp-hack/data.bin 
Import 1675516348462070315, Root bafykbzacedcb27yfqplrtjemymkf2eu2at25lrgm3fx3mlrqrn3l2ozcnk6su
roger@roger:~/dev/filecoin$ 
```
Create a car file:
```
roger@roger:~/dev/fil-spacewarp-hack$ ipfs-car --pack data.bin --output new.car
root CID: bafybeia6dzizisjwkqedds6j4xagxj6d3ek6ddsithpkpes4cosjboojxq
  output: new.car
roger@roger:~/dev/fil-spacewarp-hack$ ls -lrta
```

Create piece CID: 
```
roger@roger:~/dev/fil-spacewarp-hack$ lotus client commP /home/roger/dev/fil-spacewarp-hack/new.car
CID:  baga6ea4seaqkrzv7bvjs3gnv22pyebyyajg5ov35gkwanfqfopegozc42dopidi
Piece size:  127 MiB
Piece size in bytes:  133169152
roger@roger:~/dev/fil-spacewarp-hack$ 
```

