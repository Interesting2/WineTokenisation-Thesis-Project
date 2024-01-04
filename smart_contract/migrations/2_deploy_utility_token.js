const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const WineToken = artifacts.require('WineToken');

module.exports = async function (deployer, network, accounts) {
    // Define initial supply
    const initialSupply = web3.utils.toWei('1000', 'ether');

    // Get the contract instance
    const deployedWineToken = await WineToken.deployed().then(instance => instance).catch(err => null);

    if (!deployedWineToken) {
        // If WineToken has not been deployed, then deploy
        await deployProxy(WineToken, [initialSupply], { deployer, initializer: 'initialize' });
    } else {
        //  If deployed, then upgrade or update
        await upgradeProxy(deployedWineToken.address, WineToken, { deployer });
    }
};

// Or split the code into two files

// // Deploy wine token contract
// const { deployProxy } = require('@openzeppelin/truffle-upgrades');
// const WineToken = artifacts.require('WineToken');

// module.exports = async function (deployer) {
//     await deployProxy(WineToken, [1000], { deployer, initializer: 'initialize' }); // 1000 是初始供应量
// };


// // Upgrade wine token contract
// const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
// const WineToken = artifacts.require('WineToken');

// module.exports = async function (deployer) {
//     const existing = await WineToken.deployed();
//     await upgradeProxy(existing.address, WineToken, { deployer });
// };
