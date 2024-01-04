const IncentiveMechanism = artifacts.require("IncentiveMechanism");
const WineToken = artifacts.require("WineToken");

contract("IncentiveMechanism", accounts => {
    let incentiveMechanism, wineToken;
    const referrer = accounts[1];
    const buyer = accounts[2];
    const nonReferral = accounts[3];

    beforeEach(async () => {
        wineToken = await WineToken.new();
        incentiveMechanism = await IncentiveMechanism.new();
        const initialSupply = web3.utils.toWei('1000', 'ether');
        await wineToken.initialize(initialSupply);
        
        await incentiveMechanism.initialize(wineToken.address);
    });

    it("should correctly initialize wineToken", async () => {
        const _wineToken = await incentiveMechanism.wineToken();
        assert.equal(_wineToken, wineToken.address);
    });

    it("should allow registering a referral", async () => {
        await incentiveMechanism.registerReferral(referrer, { from: buyer });
        const registeredReferrer = await incentiveMechanism.referrals(buyer);
        assert.equal(registeredReferrer, referrer);
    });

    it("shouldn't allow self-referral", async () => {
        try {
            await incentiveMechanism.registerReferral(buyer, { from: buyer });
            assert.fail("Self referral was allowed");
        } catch (error) {
            assert(error.message.indexOf("Self referral is not allowed") >= 0, "Expected 'Self referral is not allowed' but got another error");
        }
    });

    it("should issue rewards for a registered referral", async () => {
        await incentiveMechanism.registerReferral(referrer, { from: buyer });
        const initialBalance = await wineToken.balanceOf(referrer);

        // Assuming wineToken has a function to mint or transfer tokens to the contract.
        await wineToken.transfer(incentiveMechanism.address, 100, { from: accounts[0] });
        await incentiveMechanism.issueReward(buyer, 10);

        const newBalance = await wineToken.balanceOf(referrer);
        assert.equal(newBalance.toNumber(), initialBalance.toNumber() + 10, "The referrer did not receive the correct reward");
    });

    it("shouldn't issue rewards for a non-registered referral", async () => {
        const initialBalance = await wineToken.balanceOf(referrer);

        try {
            await incentiveMechanism.issueReward(nonReferral, 10);
            assert.fail("Reward was issued for a non-registered referral");
        } catch (error) {
            assert.equal(await wineToken.balanceOf(referrer), initialBalance.toNumber(), "Referrer balance should not have changed");
        }
    });
});
