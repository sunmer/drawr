pragma solidity ^0.4.23;

contract Purchase {

    address[4] public purchasers;

    // Purchase a pet
    function purchase(uint iconId) public returns (uint) {
        require(iconId >= 0 && iconId <= 3);

        purchasers[iconId] = msg.sender;

        return iconId;
    }

    // Retrieving the purchasers
    function getPurchasers() public view returns (address[4]) {
        return purchasers;
    }

    function getBalance() public view returns (uint256) {
        return msg.sender.balance;
    }

}
