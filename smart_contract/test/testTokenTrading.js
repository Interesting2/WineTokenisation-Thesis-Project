const TokenTrading = artifacts.require("TokenTrading");
const WineToken = artifacts.require("WineToken");
const ManagementToken = artifacts.require("ManagementToken");

contract("TokenTrading", accounts => {
    let tokenTrading, wineToken, managementToken;

    beforeEach(async () => {
        wineToken = await WineToken.new();
        managementToken = await ManagementToken.new();
        tokenTrading = await TokenTrading.new();

        const initialSupply = web3.utils.toWei('1000', 'ether');
        await wineToken.initialize(initialSupply);
        await managementToken.initialize(initialSupply);

        await tokenTrading.initialize(wineToken.address, managementToken.address);
    });

    it("should initialize correctly", async () => {
        const _wineToken = await tokenTrading.wineToken();
        const _managementToken = await tokenTrading.managementToken();
        assert.equal(_wineToken, wineToken.address);
        assert.equal(_managementToken, managementToken.address);
    });

    it("should allow setting token prices", async () => {
        await tokenTrading.setTokenPrices(2, 3, { from: accounts[0] });
        const wineTokenPrice = await tokenTrading.wineTokenPrice();
        const managementTokenPrice = await tokenTrading.managementTokenPrice();
        assert.equal(wineTokenPrice.toNumber(), 2);
        assert.equal(managementTokenPrice.toNumber(), 3);
    });

    it("should not allow non-owner to set token prices", async () => {
        try {
            await tokenTrading.setTokenPrices(2, 3, { from: accounts[1] });
            assert.fail("Non-owner was able to set prices");
        } catch (error) {
            assert(error.message.indexOf("Only the owner can change token prices") >= 0, "Expected revert for non-owner");
        }
    });


    it("should allow user to buy WineTokens", async () => {
        const buyer = accounts[1];
        // const buyAmount = web3.utils.toWei('1', 'ether');
        const buyAmount = 1000;
        const wineTokenPrice = await tokenTrading.wineTokenPrice();

        // Transfer enough WineTokens to the TokenTrading contract.
        await wineToken.transfer(tokenTrading.address, buyAmount);

        // await wineToken.approve(tokenTrading.address, buyAmount, { from: await wineToken.owner() });

        // Now the buyer can purchase WineTokens
        await tokenTrading.buyWineTokens(buyAmount, { from: buyer, value: buyAmount * wineTokenPrice });

        const balance = await wineToken.balanceOf(buyer);
        assert.equal(balance.toString(), buyAmount);
    });

    it("should not allow buying more WineTokens than contract has", async () => {
        const buyAmount = 1000;  
        const wineTokenPrice = await tokenTrading.wineTokenPrice();

        try {
            await tokenTrading.buyWineTokens(buyAmount, { from: accounts[1], value: buyAmount * wineTokenPrice });
            assert.fail("Was able to buy more tokens than what contract has");
        } catch (error) {
            assert(error.message.indexOf("revert") >= 0, "Expected revert for buying more tokens");
        }
    });


    it("should emit TokensBought event when buying WineTokens", async () => {
        const buyAmount = 1000;
        const wineTokenPrice = await tokenTrading.wineTokenPrice();
        await wineToken.transfer(tokenTrading.address, buyAmount);

        const receipt = await tokenTrading.buyWineTokens(buyAmount, { from: accounts[1], value: buyAmount * wineTokenPrice });

        assert.equal(receipt.logs[0].event, "TokensBought");
        assert.equal(receipt.logs[0].args.buyer, accounts[1]);
        assert.equal(receipt.logs[0].args.amount.toString(), buyAmount.toString());
        assert.equal(receipt.logs[0].args.tokenType, "WineUtilityToken");
    });


    it("should allow user to buy ManagementTokens", async () => {
        const buyer = accounts[1];
        // const buyAmount = web3.utils.toWei('1', 'ether');
        const buyAmount = 1000;
        const managementTokenPrice = await tokenTrading.managementTokenPrice();

        // Transfer enough ManagementTokens to the TokenTrading contract.
        await managementToken.transfer(tokenTrading.address, buyAmount);

        await tokenTrading.buyManagementTokens(buyAmount, { from: buyer, value: buyAmount * managementTokenPrice });

        const balance = await managementToken.balanceOf(buyer);
        assert.equal(balance.toString(), buyAmount);
    });

    it("should allow user to sell WineTokens", async () => {
        const seller = accounts[1];
        const sellAmount = 1000;
        await web3.eth.sendTransaction({ from: accounts[0], to: tokenTrading.address, value: 2000 }); // Send ether to the address in advance

        await wineToken.transfer(seller, sellAmount);
        await wineToken.approve(tokenTrading.address, sellAmount, { from: seller });

        await tokenTrading.sellWineTokens(sellAmount, { from: seller });

        const balance = await wineToken.balanceOf(seller);
        assert.equal(balance.toString(), '0');
    });

    it("should allow user to sell ManagementTokens", async () => {
        const seller = accounts[1];
        const sellAmount = 1000;
        await web3.eth.sendTransaction({ from: accounts[0], to: tokenTrading.address, value: 2000 }); // Send ether to the address in advance

        await managementToken.transfer(seller, sellAmount);
        await managementToken.approve(tokenTrading.address, sellAmount, { from: seller });

        await tokenTrading.sellManagementTokens(sellAmount, { from: seller });

        const balance = await managementToken.balanceOf(seller);
        assert.equal(balance.toString(), '0');
    });

    it("should allow user to exchange WineTokens to ManagementTokens", async () => {
        await tokenTrading.setTokenPrices(1, 2, { from: accounts[0] });//Set price wine token 1, management token 2

        const user = accounts[1];
        const wineAmount = 1000;
        await wineToken.transfer(user, wineAmount);
        await wineToken.approve(tokenTrading.address, wineAmount, { from: user });
        

        // Transfer enough ManagementTokens to the TokenTrading contract.
        await managementToken.transfer(tokenTrading.address, 500);


        await tokenTrading.exchangeWineToManagement(wineAmount, { from: user });

        const balanceWine = await wineToken.balanceOf(user);
        const balanceManagement = await managementToken.balanceOf(user);
        assert.equal(balanceWine.toString(), '0');
        assert.isTrue(balanceManagement.toString() > '0');
    });

    it("should allow user to exchange ManagementTokens to WineTokens", async () => {
        await tokenTrading.setTokenPrices(1, 2, { from: accounts[0] });//Set price wine token 1, management token 2

        const user = accounts[1];
        const managementAmount = 1000;
        await managementToken.transfer(user, managementAmount);
        await managementToken.approve(tokenTrading.address, managementAmount, { from: user });


        // Transfer enough WineTokens to the TokenTrading contract.
        await wineToken.transfer(tokenTrading.address, 2000);


        await tokenTrading.exchangeManagementToWine(managementAmount, { from: user });

        const balanceWine = await wineToken.balanceOf(user);
        const balanceManagement = await managementToken.balanceOf(user);
        assert.equal(balanceManagement.toString(), '0');
        assert.isTrue(balanceWine.toString() > '0');
    });

    it("should allow user to place an order", async () => {
        const user = accounts[1];
        const tokenAmount = 1000;
        const etherAmount = web3.utils.toWei('1', 'ether');

        // User placing a buy order
        const receipt = await tokenTrading.placeOrder(true, wineToken.address, tokenAmount, etherAmount, { from: user, value: etherAmount });
        assert.equal(receipt.logs[0].event, "OrderPlaced");
        assert.equal(receipt.logs[0].args.trader, user);
        assert.isTrue(receipt.logs[0].args.isBuyOrder);
        assert.equal(receipt.logs[0].args.tokenAddress, wineToken.address);
    });

    it("should allow user to fill an order", async () => {
        const user1 = accounts[1];
        const user2 = accounts[2];
        const tokenAmount = 1000;
        const etherAmount = web3.utils.toWei('1', 'ether');

        // User1 placing a sell order
        await wineToken.transfer(user1, tokenAmount);
        await wineToken.approve(tokenTrading.address, tokenAmount, { from: user1 });
        await tokenTrading.placeOrder(false, wineToken.address, tokenAmount, etherAmount, { from: user1 });

        // User2 filling the order
        await tokenTrading.placeOrder(true, wineToken.address, tokenAmount, etherAmount, { from: user2, value: etherAmount });
        const receiptSell = await tokenTrading.fillOrder(0, tokenAmount, { from: user2, value: etherAmount });
        const receiptBuy = await tokenTrading.fillOrder(1, tokenAmount, { from: user2, value: etherAmount });
        assert.equal(receiptSell.logs[0].event, "OrderFilled");
        assert.equal(receiptSell.logs[0].args.orderId.toNumber(), 0);
        assert.equal(receiptSell.logs[0].args.amount.toNumber(), tokenAmount);

        assert.equal(receiptBuy.logs[0].event, "OrderFilled");
        assert.equal(receiptBuy.logs[0].args.orderId.toNumber(), 1);
        assert.equal(receiptBuy.logs[0].args.amount.toNumber(), tokenAmount);
    });

    it("should allow user to partially fill an order", async () => {
        const user1 = accounts[1];
        const user2 = accounts[2];
        const tokenAmount = 1000;
        const partialFillAmount = 500;
        const etherAmount = 1000
        const partialEtherAmount = etherAmount / 2;

        // User1 placing a sell order
        await wineToken.transfer(user1, tokenAmount);
        await wineToken.approve(tokenTrading.address, tokenAmount, { from: user1 });
        await tokenTrading.placeOrder(false, wineToken.address, tokenAmount, etherAmount, { from: user1 });

        // User2 placing a buy order
        await tokenTrading.placeOrder(true, wineToken.address, partialFillAmount, partialEtherAmount, { from: user2, value: partialEtherAmount});

        // User2 partially filling User1's sell order
        const receipt_sell = await tokenTrading.fillOrder(0, partialFillAmount, { from: user2});
        const receipt_buy = await tokenTrading.fillOrder(1, partialFillAmount, { from: user2});
        assert.equal(receipt_sell.logs[0].event, "OrderFilled");
        assert.equal(receipt_sell.logs[0].args.orderId.toNumber(), 0);
        assert.equal(receipt_sell.logs[0].args.amount.toNumber(), partialFillAmount);

        // Validate that User1's order is partially filled
        const updatedOrder = await tokenTrading.orders(0);
        assert.equal(updatedOrder.filled, partialFillAmount, "Order was not partially filled correctly");

        // User2 placing a buy order
        await tokenTrading.placeOrder(true, wineToken.address, partialFillAmount, partialEtherAmount, { from: user2, value: partialEtherAmount });

        // User2 partially fills User1's sell order again
        const secondReceipt = await tokenTrading.fillOrder(0, partialFillAmount, { from: user2, value: partialEtherAmount });
        await tokenTrading.fillOrder(2, partialFillAmount, { from: user2, value: partialEtherAmount });
        assert.equal(secondReceipt.logs[0].event, "OrderFilled");
        assert.equal(secondReceipt.logs[0].args.orderId.toNumber(), 0);
        assert.equal(secondReceipt.logs[0].args.amount.toNumber(), partialFillAmount);

        // Validate that the order is now fully filled
        const finalOrder = await tokenTrading.orders(0);
        assert.equal(finalOrder.filled, tokenAmount, "Order was not fully filled after the second fill");
    });



    it("should allow user to cancel an order", async () => {
        const user = accounts[1];
        const tokenAmount = 1000;
        const etherAmount = web3.utils.toWei('1', 'ether');

        // User placing a sell order
        await wineToken.transfer(user, tokenAmount);
        await wineToken.approve(tokenTrading.address, tokenAmount, { from: user });
        await tokenTrading.placeOrder(false, wineToken.address, tokenAmount, etherAmount, { from: user });

        // User canceling the order
        const receipt = await tokenTrading.cancelOrder(0, { from: user });
        assert.equal(receipt.logs[0].event, "OrderCancelled");
        assert.equal(receipt.logs[0].args.orderId.toNumber(), 0);
    });

    it("should not allow user to fill a canceled order", async () => {
        const user1 = accounts[1];
        const user2 = accounts[2];
        const tokenAmount = 1000;
        const etherAmount = web3.utils.toWei('1', 'ether');

        // User1 placing a sell order
        await wineToken.transfer(user1, tokenAmount);
        await wineToken.approve(tokenTrading.address, tokenAmount, { from: user1 });
        await tokenTrading.placeOrder(false, wineToken.address, tokenAmount, etherAmount, { from: user1 });

        // User1 canceling the order
        await tokenTrading.cancelOrder(0, { from: user1 });

        // User2 trying to fill the order
        await tokenTrading.placeOrder(true, wineToken.address, tokenAmount, etherAmount, { from: user2, value: etherAmount });
        try {
            await tokenTrading.fillOrder(0, tokenAmount, { from: user2, value: etherAmount });
            assert.fail("Was able to fill a canceled order");
        } catch (error) {
            assert(error.message.indexOf("Order is canceled") >= 0, "Expected revert for filling a canceled order");
        }
    });

    it("should distribute revenue and allow management token holder to claim rewards", async () => {
        const user = accounts[1];
        const revenue = web3.utils.toWei('1', 'ether');

        // Transfer management tokens to the user to make them eligible for rewards
        const tokensForUser = web3.utils.toWei('10', 'ether');
        await managementToken.transfer(user, tokensForUser);

        // Transfer enough wineTokens to the contract to distribute as rewards
        await wineToken.transfer(tokenTrading.address, revenue);
        const balance = await wineToken.balanceOf(tokenTrading.address);

        await tokenTrading.distributeRevenue(revenue);
        const totalSupply = await managementToken.totalSupply();
        const expectedReward = new web3.utils.BN(revenue).mul(new web3.utils.BN(tokensForUser)).div(new web3.utils.BN(totalSupply));
        const pendingReward = await tokenTrading.pendingRewards(user);
        assert.equal(pendingReward.toString(), expectedReward.toString());

        const initialWineBalance = await wineToken.balanceOf(user);

        // Claiming rewards
        await tokenTrading.claimRewards({ from: user });

        const newWineBalance = await wineToken.balanceOf(user);
        assert.equal(newWineBalance.sub(initialWineBalance).toString(), pendingReward, "Rewards were not correctly claimed or transferred");

        const updatedPendingReward = await tokenTrading.pendingRewards(user);
        assert.equal(updatedPendingReward.toString(), '0', "Rewards should be zero after claiming");
    });


});

