const WineToken = artifacts.require("WineToken");
const assert = require("assert");

contract("WineToken", accounts => {
    let instance;
    const owner = accounts[0];
    const nonOwner = accounts[1];
    const initialSupply = "1000";

    beforeEach(async () => {
        instance = await WineToken.new();
        await instance.initialize(initialSupply, { from: owner });
    });

    it("should correctly initialize owner and initial supply", async () => {
        const totalSupply = await instance.totalSupply();
        assert.strictEqual(totalSupply.toString(), initialSupply, "Initial supply is incorrect");

        const contractOwner = await instance.owner();
        assert.strictEqual(contractOwner, owner, "Owner is incorrect");
    });

    it("should allow owner to mint tokens", async () => {
        const mintAmount = "500";
        await instance.mint(mintAmount, { from: owner });
        const totalSupplyAfterMint = await instance.totalSupply();
        assert.strictEqual(totalSupplyAfterMint.toString(), (parseInt(initialSupply) + parseInt(mintAmount)).toString(), "Total supply after mint is incorrect");
    });

    it("should not allow non-owners to mint tokens", async () => {
        let error = null;
        try {
            await instance.mint("500", { from: nonOwner });
        } catch (err) {
            error = err;
        }
        assert.ok(error instanceof Error, "Non-owner could mint tokens");
    });
});
