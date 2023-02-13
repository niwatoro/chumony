// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";

contract PlaceChumon is ERC721A {
    constructor(string memory _name, string memory _symbol)
        ERC721A(_name, _symbol)
    {}

    mapping(uint256 => uint256) public rewards;
    mapping(uint256 => bool) public completed;

    function placeMint() public payable {
        require(msg.value > 0, "Must send ETH");
        _safeMint(msg.sender, 1);
        rewards[_currentIndex] = msg.value;
        completed[_currentIndex] = false;
    }

    function approveReward(uint256 tokenId, address rewarded) public {
        require(
            _ownershipOf(tokenId).addr == msg.sender,
            "Must be owner of token"
        );
        require(!completed[tokenId], "Reward already taken");
        payable(rewarded).transfer(rewards[tokenId]);
        completed[tokenId] = true;
    }

    function getRewardById(uint256 tokenId) public view returns (uint256) {
        return rewards[tokenId];
    }
}

contract ReceiveChumon is ERC721A {
    PlaceChumon pc;

    constructor(
        string memory _name,
        string memory _symbol,
        address _place_chumon_address
    ) ERC721A(_name, _symbol) {
        pc = PlaceChumon(_place_chumon_address);
    }

    mapping(uint256 => uint256) placeOrderIds;

    function receiveMint(uint256 placeOrderId) public payable {
        require(
            msg.value == pc.getRewardById(placeOrderId) / 10,
            "Must send correct amount"
        );
        _safeMint(msg.sender, 1);
        placeOrderIds[_currentIndex] = placeOrderId;
    }

    function getAllReceivedByPlacedId(uint256 placeOrderId)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory receivedIds = new uint256[](_currentIndex);
        uint256 receivedCount = 0;
        for (uint256 i = 1; i <= _currentIndex; i++) {
            if (placeOrderIds[i] == placeOrderId) {
                receivedIds[receivedCount] = i;
                receivedCount++;
            }
        }
        return receivedIds;
    }
}
