const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const ManagementToken = artifacts.require('ManagementToken');

module.exports = async function (deployer, network, accounts) {
    // Define initial supply
    const initialSupply = web3.utils.toWei('1000', 'ether');

    // Get the contract instance
    const deployedManagementToken = await ManagementToken.deployed().then(instance => instance).catch(err => null);

    if (!deployedManagementToken) {
        // If Management Token has not been deployed, then deploy
        await deployProxy(ManagementToken, [initialSupply], { deployer, initializer: 'initialize' });
    } else {
        //  If deployed, then upgrade or update
        await upgradeProxy(deployedManagementToken.address, ManagementToken, { deployer });
    }
};