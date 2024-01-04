const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const TokenTrading = artifacts.require('TokenTrading');
const WineToken = artifacts.require('WineToken');
const ManagementToken = artifacts.require('ManagementToken');

module.exports = async function (deployer, network, accounts) {
    const wineToken = await WineToken.deployed();
    const managementToken = await ManagementToken.deployed();

    // Define args of TokenTrading initialization
    const initializerArgs = [wineToken.address, managementToken.address];

    // Get the instance
    const deployedTokenTrading = await TokenTrading.deployed()
        .then(instance => instance)
        .catch(err => null);

    if (!deployedTokenTrading) {
        // If TokenTrading has not been deployed，then deploy it
        await deployProxy(TokenTrading, initializerArgs, { deployer, initializer: 'initialize' });
    } else {
        // Otherwise，upgrade or update it
        await upgradeProxy(deployedTokenTrading.address, TokenTrading, { deployer });
    }
};
