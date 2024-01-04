const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const WineToken = artifacts.require('WineToken');
const IncentiveMechanism = artifacts.require('IncentiveMechanism');

module.exports = async function (deployer, network, accounts) {
    const wineToken = await WineToken.deployed();

    // Define args of IncentiveMechanism initialization
    const initializerArgs = [wineToken.address];

    // Get IncentiveMechanism instance
    const deployedIncentiveMechanism = await IncentiveMechanism.deployed()
        .then(instance => instance)
        .catch(err => null);

    if (!deployedIncentiveMechanism) {
        // If IncentiveMechanism has not been deployed, then deploy it
        await deployProxy(IncentiveMechanism, initializerArgs, { deployer, initializer: 'initialize' });
    } else {
        // Otherwise, upgrade or update it
        await upgradeProxy(deployedIncentiveMechanism.address, IncentiveMechanism, { deployer });
    }
};
