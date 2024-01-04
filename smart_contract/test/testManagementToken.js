const ManagementToken = artifacts.require("ManagementToken");
const assert = require("assert");

contract("ManagementToken", accounts => {
    let instance;
    const owner = accounts[0];
    const nonOwner = accounts[1];
    const initialSupply = "1000";

    beforeEach(async () => {
        instance = await ManagementToken.new();
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

    it("should correctly add and remove holders", async () => {
        const recipient = accounts[2];
        const sendAmount = "100";

        // Initial holder count
        let holderCount = await instance.holderCount();

        // Transfer tokens to a new holder
        await instance.transfer(recipient, sendAmount, { from: owner });

        // Verify the holder is added
        const holderAddress = await instance.getHolder(holderCount);
        assert.strictEqual(holderAddress, recipient, "Holder address is incorrect");

        const holderCountAfter = await instance.holderCount();
        assert.equal(holderCountAfter.toNumber(), holderCount.toNumber()+1, "Holder count is incorrect after transfer");

        // Transfer all tokens back from the new holder
        await instance.transfer(owner, sendAmount, { from: recipient });

        // Verify the holder is removed
        holderCount = await instance.holderCount();
        assert.equal(holderCount.toNumber(), holderCountAfter.toNumber()-1, "Holder count is incorrect after transfer back");
    });
});
