const pool = require('../server');


const Trade = {

    async addSellTrade(tradeId,tradeType,tokenType,sellerId, num, price,createTime) {
        const result = await pool.query('INSERT INTO trade (trade_id,trade_type,token_type,trader_id,initial_num,current_num,price,create_time) VALUES (?,?,?,?,?,?,?,?)', [tradeId,tradeType,tokenType,sellerId,num,num,price,createTime]);
        return result[0].insertId;
    },

    async addBuyTrade(tradeId,tradeType,tokenType,buyerId, num, price,createTime) {
        const result = await pool.query('INSERT INTO trade (trade_id,trade_type,token_type, trader_id,initial_num,current_num,price,create_time) VALUES (?,?,?,?,?,?,?,?)', [tradeId,tradeType,tokenType, buyerId,num, num, price,createTime]);
        //console.log("insert id = ",result[0].insertId);
        return result[0].insertId;
    },

    async updateTrade(tradeId, num,status) {
        const result = await pool.query('UPDATE  trade  SET current_num  = ? ,status = ? WHERE trade_id = ?', [num,status,tradeId]);
        return result;
    },

    async matchSellTrader(price){
        const [rows, fields]  = await pool.query('SELECT * FROM trade WHERE trade_type = ? AND price >= ? and current_num > 0 and status != ? order by price desc, trade_id limit 1', ['buy',price,3]);
        return rows[0];
    },

    async matchBuyTrader(price){
        const [rows, fields] = await pool.query('SELECT * FROM trade WHERE trade_type = ? AND price <= ? and current_num > 0 and status != ? order by price, trade_id limit 1', ['sell',price,3]);
        return rows[0];
    },

    async getBuyTrade() {
        const [rows, fields] = await pool.query('SELECT * FROM trade WHERE trade_type = ? and current_num != ? and status != ? Order By price desc,trade_id LIMIT 10',['buy',0,3]);
        return rows;
    },

    async getSellTrade() {
        const [rows, fields] = await pool.query('SELECT * FROM trade WHERE trade_type = ? and current_num != ? and status != ? Order By price desc,trade_id LIMIT 10',['sell',0,3]);
        return rows;
    },

    async cancelTrade(tradeId) {
        const result = await pool.query('UPDATE  trade  SET status  = ?  WHERE trade_id = ?', [3, tradeId]);
        return result;
    },

    async getTradeById(trader_id) {
        const [rows, fields] = await pool.query('SELECT * FROM trade WHERE trader_id = ? Order By id desc',[trader_id]);
        return rows;
    },


}

module.exports = Trade;