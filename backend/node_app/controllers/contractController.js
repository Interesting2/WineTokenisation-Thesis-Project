const Contract = require('../models/contract');

// get contract
async function getContract(req,res) {
    const contractType =  req.query.contract_type;
    // check contract
    const existingContract = await Contract.findContract(contractType);
    if (!existingContract) {
        return res.status(400).json({ message: 'No revelant contract!'});
    }else{
        const contractAddress = existingContract.contract_address;
        const contractABI = JSON.parse(existingContract.contract_abi);
  
        // return contract Info
        return res.status(200).json({ contract_address: contractAddress,contract_abi:contractABI});
    }
}

module.exports = { getContract };