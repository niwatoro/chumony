pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ERC721, Ownable {
    using Counters for Counters.Counter;

    struct PlacedOrder {
        string name;
        string description;
        uint256 dueTime;
        uint256 reward;
    }
    mapping(uint256 => PlacedOrder) public placedOrders;
    Counters.Counter private _placedOrderIds;

    struct ReceivedOrder {
        uint256 placedOrderId;
        uint256 deposit;
        bool completed;
    }
    mapping(uint256 => ReceivedOrder) public receivedOrders;
    Counters.Counter private _receivedOrderIds;

    constructor() ERC721("chumon", "CHMN") {}

    event PlaceOrder(uint256 placedOrderId, uint256 reward);
    event ReceiveOrder(
        uint256 receivedOrderId,
        uint256 placedOrderId,
        uint256 deposit
    );
    event ApproveWithdrawal(uint256 receivedOrderId, uint256 reward);
    event BurnPlacedOrder(uint256 placedOrderId, uint256 reward);
    event BurnReceivedOrder(uint256 receivedOrderId, uint256 deposit);

    function placeOrder(
        string memory name,
        string memory description,
        uint256 duration,
        uint256 reward
    ) public payable {
        require(
            msg.value == reward,
            "The amount sent must be equal to the reward."
        );

        _placedOrderIds.increment();
        uint256 newPlacedOrderId = _placedOrderIds.current();

        placedOrders[newPlacedOrderId] = PlacedOrder(
            name,
            description,
            block.timestamp + duration,
            reward
        );
        _mint(msg.sender, newPlacedOrderId);
        emit PlaceOrder(newPlacedOrderId, reward);
    }

    function receiveOrder(uint256 placedOrderId) public payable {
        require(
            placedOrders[placedOrderId].reward > 0,
            "This order has already been taken or burned."
        );
        require(
            msg.value == placedOrders[placedOrderId].reward / 10,
            "The deposit must be equal to 10% of the reward."
        );
        require(
            placedOrders[placedOrderId].dueTime > block.timestamp,
            "A new Receive NFT can't be minted because the dueTime has passed."
        );

        _receivedOrderIds.increment();
        uint256 newReceivedOrderId = _receivedOrderIds.current();

        receivedOrders[newReceivedOrderId] = ReceivedOrder(
            placedOrderId,
            msg.value,
            false
        );
        _mint(msg.sender, newReceivedOrderId + 2**255);
        emit ReceiveOrder(newReceivedOrderId, placedOrderId, msg.value);
    }

    function approveWithdrawal(uint256 receivedOrderId) public {
        uint256 placedOrderId = receivedOrders[receivedOrderId].placedOrderId;
        uint256 reward = placedOrders[placedOrderId].reward;

        require(
            placedOrders[placedOrderId].reward > 0,
            "This order has already been taken or burned."
        );
        require(
            _isApprovedOrOwner(msg.sender, receivedOrderId),
            "Only the owner of the Placed Order NFT can approve the withdrawal."
        );

        receivedOrders[receivedOrderId].completed = true;
        payable(msg.sender).transfer(reward);
        emit ApproveWithdrawal(receivedOrderId, reward);
    }

    function getPlacedOrdersLength() public view returns (uint256) {
        return _placedOrderIds.current();
    }

    function getReceivedrdersLength() public view returns (uint256) {
        return _receivedOrderIds.current();
    }

    function getReceivedOrdersByPlacedOrderId(uint256 placedOrderId)
        public
        view
        returns (uint256[] memory)
    {
        uint8 receivedOrderIdCounter;
        uint256[] memory receivedOrderIds = new uint256[](0);
        for (uint256 i = 0; i < _receivedOrderIds.current(); i++) {
            if (receivedOrders[i].placedOrderId == placedOrderId) {
                uint256 newReceivedOrderId = receivedOrderIdCounter;
                receivedOrderIds[newReceivedOrderId] = i;
                receivedOrderIdCounter++;
            }
        }
        return receivedOrderIds;
    }

    // Function to burn a placed order
    function burnPlacedOrder(uint256 _placedOrderId) public {
        uint256 reward = placedOrders[_placedOrderId].reward;

        require(
            placedOrders[_placedOrderId].reward > 0,
            "This order has already been taken or burned."
        );
        require(
            _isApprovedOrOwner(msg.sender, _placedOrderId),
            "Only the owner of the Placed Order NFT can burn it."
        );

        placedOrders[_placedOrderId].reward = 0;
        _burn(_placedOrderId);
        payable(msg.sender).transfer(reward);
        emit BurnPlacedOrder(_placedOrderId, reward);
    }

    // Function to burn a received order
    function burnReceivedOrder(uint256 _receivedOrderId) public {
        uint256 deposit = receivedOrders[_receivedOrderId].deposit;

        require(
            receivedOrders[_receivedOrderId].completed == false,
            "This order has already been completed."
        );

        _burn(_receivedOrderId + 2**255);
        payable(msg.sender).transfer(deposit);
        emit BurnReceivedOrder(_receivedOrderId, deposit);
    }
}
