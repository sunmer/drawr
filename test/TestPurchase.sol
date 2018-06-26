pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Purchase.sol";

contract TestPurchase {
    Purchase purchase = Purchase(DeployedAddresses.Purchase());

    // Testing the purchase() function
    function testUserCanPurchase() public {
        uint returnedId = purchase.purchase(1);

        uint expected = 1;

        Assert.equal(returnedId, expected, "Adoption of pet ID 1 should be recorded.");
    }

    // Testing retrieval of a image owner
    function testGetPurchaseAddressByPurchaseId() public {
        // Expected owner is this contract
        address expected = this;

        address purchaser = purchase.purchasers(1);

        Assert.equal(purchaser, expected, "Owner of pet ID 8 should be recorded.");
    }

    // Testing retrieval of all pet owners
    function testGetPurchaserAddressByPurchaseIdInArray() public {
        // Expected owner is this contract
        address expected = this;

        // Store adopters in memory rather than contract's storage
        address[4] memory purchasers = purchase.getPurchasers();

        Assert.equal(purchasers[1], expected, "Owner of pet ID 8 should be recorded.");
    }

}
