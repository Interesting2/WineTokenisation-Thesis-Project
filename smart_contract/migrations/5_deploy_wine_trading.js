const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const WineTrading = artifacts.require('WineTrading');
const WineToken = artifacts.require('WineToken');

module.exports = async function (deployer, network, accounts) {
    const wineToken = await WineToken.deployed(); 

    // Define args of WineTrading initialization
    const initializerArgs = [wineToken.address];

    // Get WineTrading instance
    const deployedWineTrading = await WineTrading.deployed()
        .then(instance => instance)
        .catch(err => null);

    if (!deployedWineTrading) {
        // If WineTrading has not been deployed，then deploy it
        await deployProxy(WineTrading, initializerArgs, { deployer, initializer: 'initialize' });
    } else {
        // Otherwise，upgrade or update it
        await upgradeProxy(deployedWineTrading.address, WineTrading, { deployer });
    }
};
