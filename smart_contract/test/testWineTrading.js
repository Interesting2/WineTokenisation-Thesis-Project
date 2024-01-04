const WineTrading = artifacts.require("WineTrading");
const WineToken = artifacts.require("WineToken");

contract("WineTrading", accounts => {
    let wineTrading, wineToken;

    beforeEach(async () => {
        wineToken = await WineToken.new();
        wineTrading = await WineTrading.new();

        const initialSupply = web3.utils.toWei('1000', 'ether');
        await wineToken.initialize(initialSupply);
        await wineTrading.initialize(wineToken.address);
    });

    it("should correctly initialize wineToken", async () => {
        const _wineToken = await wineTrading.wineToken();
        assert.equal(_wineToken, wineToken.address);
    });

    it("should allow adding a wine", async () => {
        await wineTrading.addWine("Red Wine", 100, 1000, "Test red wine from A area", 2023, { from: accounts[0] });
        const wineCount = await wineTrading.getWinesCount();
        assert.equal(wineCount.toNumber(), 1);
    });

    it("should allow purchasing wine", async () => {
        await wineTrading.addWine("Red Wine", 100, 1000, "Test red wine from A area", 2023, { from: accounts[0] });
        const seller = accounts[0];
        const buyer = accounts[1];

        // Transfer tokens to buyer for purchasing the wine
        await wineToken.transfer(buyer, 200);
        await wineToken.approve(wineTrading.address, 200, { from: buyer });

        await wineTrading.purchaseWine(0, 2, { from: buyer }); // Buy 2 

        const wineDetails = await wineTrading.getWineDetails(0);
        assert.equal(wineDetails[3].toNumber(), 998, "Stock didn't decrease after purchase");
    });

    it("should allow updating wine details", async () => {
        await wineTrading.addWine("Red Wine", 100, 1000, "Test red wine from A area", 2023, { from: accounts[0] });

        await wineTrading.updateWinePrice(0, 120);
        const winePrice = await wineTrading.getWinePrice(0);
        assert.equal(winePrice.toNumber(), 120, "Wine price did not update correctly");

        await wineTrading.updateWineStock(0, 900);
        const wineStock = await wineTrading.getWineStock(0);
        assert.equal(wineStock.toNumber(), 900, "Wine stock did not update correctly");

        await wineTrading.updateWineName(0, "White Wine");
        const wineDetails = await wineTrading.getWineDetails(0);
        assert.equal(wineDetails[1], "White Wine", "Wine name did not update correctly");

        await wineTrading.updateWineIntro(0, "Test white wine from B area");
        const updatedWineDetails = await wineTrading.getWineDetails(0);
        assert.equal(updatedWineDetails[4], "Test white wine from B area", "Wine intro did not update correctly");
    });

    it("should allow deactivating and activating a wine", async () => {
        await wineTrading.addWine("Red Wine", 100, 1000, "Test red wine from A area", 2023, { from: accounts[0] });

        await wineTrading.deactivateWine(0);
        let wineDetails = await wineTrading.getWineDetails(0);
        assert.equal(wineDetails[7], false, "Wine should be deactivated");

        await wineTrading.activateWine(0);
        wineDetails = await wineTrading.getWineDetails(0);
        assert.equal(wineDetails[7], true, "Wine should be activated");
    });

    it("should allow a user to purchase wine", async () => {
        const buyer = accounts[1];
        const tokensToBuy = 150;
        const amountToPurchase = 1;

        await wineTrading.addWine("Red Wine", 100, 1000, "Test red wine from A area", 2023, { from: accounts[0] });

        // Transfer and approve tokens for buyer
        await wineToken.transfer(buyer, tokensToBuy);
        await wineToken.approve(wineTrading.address, tokensToBuy, { from: buyer });

        await wineTrading.purchaseWine(0, amountToPurchase, { from: buyer });

        const wineStock = await wineTrading.getWineStock(0);
        assert.equal(wineStock.toNumber(), 999, "Wine stock did not decrease after purchase");

        const buyerBalance = await wineToken.balanceOf(buyer);
        assert.equal(buyerBalance.toNumber(), 50, "Buyer's wineToken balance did not decrease after purchase");
    });

});
