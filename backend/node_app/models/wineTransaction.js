const pool = require('../server');


const WineTransaction = {

    async addWineTransaction(wineId,sellerId,buyerId,unitPrice,num,transactionTime) {
        const result = await pool.query('INSERT INTO wine_transaction (wine_id,seller_id,buyer_id,unit_price,num,transaction_time) VALUES (?,?,?,?,?,?)', [wineId,sellerId,buyerId,unitPrice,num,transactionTime]);
        return result[0].insertId;
    },

    async getWineTransactionByWineId(wineId) {
        const [rows, fields]  = await pool.query('SELECT * FROM wine_transaction WHERE wine_id = ? order by wine_transaction_id', [wineId]);
        return rows;
    },

    async getWineTransactionByBuyerId(buyerId) {
        const [rows, fields]  = await pool.query('SELECT * FROM wine_transaction WHERE buyer_id = ? order by wine_transaction_id', [buyerId]);
        return rows;
    },

    async getWineTransactionBySellerId(sellerId) {
        const [rows, fields]  = await pool.query('SELECT * FROM wine_transaction WHERE seller_id = ? order by wine_transaction_id', [sellerId]);
        return rows;
    },

}

module.exports = WineTransaction;