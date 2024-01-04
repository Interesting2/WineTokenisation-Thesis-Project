const pool = require('../server');


// user model
const Transaction = {

    async getSellTransaction(sellerId) {
        const [rows, fields] = await pool.query('SELECT * FROM transactions WHERE seller_id = ? order by transaction_id desc', [sellerId]);
        return rows;
    },

    async getBuyTransaction(buyerId) {
        const [rows, fields] = await pool.query('SELECT * FROM transactions WHERE buyer_id = ? order by transaction_id desc', [buyerId]);
        return rows;
    },

    async getAllTransaction(orderBy) {
        const [rows, fields] = await pool.query('SELECT * FROM transactions order by transaction_id DESC');
        return rows;

    },

    async addTransaction(transactionType, tokenType,sellerId,buyerId,tokenNum,value,transactionTime) {
        const result = await pool.query('INSERT INTO transactions (transaction_type, token_type,seller_id,buyer_id,token_num,value,transaction_time) VALUES (?,?,?,?,?,?,?)', [transactionType, tokenType,sellerId,buyerId,tokenNum,value,transactionTime]);
        return result;
    },

}

module.exports = Transaction;