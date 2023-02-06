// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract ReplicationWorker {
    uint256 public replicaCount;
    mapping(uint256 => uint256) public replicaIdToDealId;
    mapping(uint256 => uint256) public replicaIdToRegion;
    //mapping(uint256 => uint256) public replicaIdToLatency;
    mapping(uint256 => uint256) public replicaIdToPrice;
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function setReplicaCount(uint256 _replicaCount) public {
        require(msg.sender == owner, "Only owner can set replica count");
        replicaCount = _replicaCount;
    }

    function setReplicaPolicy(
        uint256 _replicaId, 
        uint256 _region, 
        //uint256 _latency, 
        uint256 _price) public {

        require(msg.sender == owner, "Only owner can set replica policy");
        require(_replicaId < replicaCount, "Invalid replica ID");

        replicaIdToRegion[_replicaId] = _region;
        //replicaIdToLatency[_replicaId] = _latency;
        replicaIdToPrice[_replicaId] = _price;
    }

    function replicateData(uint256 _dealId) public {
        require(msg.sender == owner, "Only owner can replicate data");

        for (uint256 i = 0; i < replicaCount; i++) {
            uint256 region = replicaIdToRegion[i];
            //uint256 latency = replicaIdToLatency[i];
            uint256 price = replicaIdToPrice[i];

            // Implementation to replicate data N times based on the user defined policy
            // This is just a sample implementation 
            
            //bytes memory data = abi.encodePacked(region, latency, price);
            bytes memory data = abi.encodePacked(region, price);
            address minerAddress = address(bytes20(keccak256(abi.encodePacked(data))));

            // Send a message to the miner to replicate the data
            minerAddress.call.value(price)("replicateData", _dealId);

            replicaIdToDealId[i] = _dealId;
        }
    }
}
