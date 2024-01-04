const pool = require('../server');


// Contract model
const Contract = {

    async findContract(contractType) {
        const [rows, fields] = await pool.query('SELECT * FROM contract WHERE contract_type = ? and status = 1', [3]);
        return rows[0];
    },

    async findTradeContract(contractType) {
        const [rows, fields] = await pool.query('SELECT * FROM contract WHERE contract_type = ? and status = 1', [contractType]);
        return rows[0];
    },

}

module.exports = Contract;