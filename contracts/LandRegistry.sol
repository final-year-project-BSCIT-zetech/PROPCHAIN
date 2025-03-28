// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct TransactionHistory {
        string previousOwnerId;
        address newOwner;
        uint256 timestamp;
    }

    struct Land {
        string titleDeedNumber;
        address currentOwner;
        string nationalId;
        TransactionHistory[] history;
        bool isRegistered;
    }

    mapping(string => Land) public lands;
    mapping(address => string) public owners;
    mapping(string => address) public nationalIdToAddress;
    string[] private registeredLands; // Array to store registered land title deed numbers

    event LandRegistered(
        string indexed titleDeedNumber,
        address indexed owner
    );
    event OwnershipTransferred(
        string indexed titleDeedNumber,
        address indexed newOwner
    );

    modifier onlyLandOwner(string memory _titleDeedNumber) {
        require(lands[_titleDeedNumber].isRegistered, "Land not registered");
        require(
            lands[_titleDeedNumber].currentOwner == msg.sender,
            "Not the owner"
        );
        _;
    }

    modifier onlyVerifiedOwner() {
        require(
            bytes(owners[msg.sender]).length > 0,
            "User not registered with National ID"
        );
        _;
    }

    address public defaultOwner;

    constructor(address _defaultOwner) {
        require(_defaultOwner != address(0), "Invalid default owner address");
        defaultOwner = _defaultOwner;
        owners[_defaultOwner] = "00000000";
        nationalIdToAddress["00000000"] = _defaultOwner;
    }

    function registerOwner(string memory _nationalId) public {
        require(bytes(owners[msg.sender]).length == 0, "Already registered");
        require(
            nationalIdToAddress[_nationalId] == address(0),
            "National ID already in use"
        );

        owners[msg.sender] = _nationalId;
        nationalIdToAddress[_nationalId] = msg.sender;
    }

    function registerLand(string memory _titleDeedNumber) public onlyVerifiedOwner {
        require(!lands[_titleDeedNumber].isRegistered, "Error: Land already registered!");

        Land storage newLand = lands[_titleDeedNumber];
        newLand.titleDeedNumber = _titleDeedNumber;
        newLand.currentOwner = msg.sender;
        newLand.nationalId = owners[msg.sender];
        newLand.isRegistered = true;

        registeredLands.push(_titleDeedNumber);

        emit LandRegistered(_titleDeedNumber, msg.sender);
    }

    function transferOwnership(
        string memory _titleDeedNumber,
        address _newOwner
    ) public onlyLandOwner(_titleDeedNumber) onlyVerifiedOwner {
        require(
            bytes(owners[_newOwner]).length > 0,
            "New owner must be registered"
        );
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != msg.sender, "Cannot transfer to self");

        Land storage land = lands[_titleDeedNumber];
        string memory previousOwnerId = land.nationalId;

        land.history.push(
            TransactionHistory({
                previousOwnerId: previousOwnerId,
                newOwner: _newOwner,
                timestamp: block.timestamp
            })
        );

        land.currentOwner = _newOwner;
        land.nationalId = owners[_newOwner];

        emit OwnershipTransferred(_titleDeedNumber, _newOwner);
    }

    function getLandDetails(
        string memory _titleDeedNumber
    ) public view returns (address currentOwner, string memory nationalId) {
        require(lands[_titleDeedNumber].isRegistered, "Land not found");
        Land storage land = lands[_titleDeedNumber];
        return (land.currentOwner, land.nationalId);
    }

    function getLandHistory(
        string memory _titleDeedNumber
    ) public view returns (TransactionHistory[] memory) {
        require(lands[_titleDeedNumber].isRegistered, "Land not found");
        return lands[_titleDeedNumber].history;
    }

    function getMyNationalId()
        public
        view
        onlyVerifiedOwner
        returns (string memory)
    {
        return owners[msg.sender];
    }

    function getAllRegisteredLands() public view returns (string[] memory) {
        return registeredLands;
    }

    function getLandsByOwner() public view onlyVerifiedOwner returns (string[] memory) {
        uint count = 0;
        for (uint i = 0; i < registeredLands.length; i++) {
            if (lands[registeredLands[i]].currentOwner == msg.sender) {
                count++;
            }
        }

        string[] memory userLands = new string[](count);
        uint index = 0;

        for (uint i = 0; i < registeredLands.length; i++) {
            if (lands[registeredLands[i]].currentOwner == msg.sender) {
                userLands[index] = registeredLands[i];
                index++;
            }
        }

        return userLands;
    }
}
