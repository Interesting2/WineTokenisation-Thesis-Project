const pool = require('../server');


const Wine = {

    async getAllWine() {
        const [rows, fields]  = await pool.query('SELECT * FROM wine WHERE status = ? and current_num != ? order by wine_id', [0,0]);
        return rows;
    },

    async getAllWineByPrice(orderBy) {
        const query = 'SELECT * FROM wine WHERE status = ? and current_num != 0 order by price ?'
        const filledQuery = query.replace('?', 0).replace('?', orderBy);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async getAllWineByVintage(orderBy) {
        const query = 'SELECT * FROM wine WHERE status = ? and current_num != 0 order by vintage ?'
        const filledQuery = query.replace('?', 0).replace('?', orderBy);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async getWineByWineId(wineId) {
        const [rows, fields]  = await pool.query('SELECT * FROM wine WHERE wine_id = ?', [wineId]);
        return rows[0];
    },

    async getWineBySellerIdAndStatus(sellerId,statuses) {
        const query = 'SELECT * FROM wine WHERE seller_id = ? and status in (?) order by wine_id';
        const filledQuery = query.replace('?', sellerId).replace('?', statuses);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async getWineBySellerId(sellerId) {
        const query = 'SELECT * FROM wine WHERE seller_id = ? order by wine_id';
        const filledQuery = query.replace('?', sellerId);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async getWineBySellerIdOrderByPrice(sellerId, orderBy) {
        const query = 'SELECT * FROM wine WHERE seller_id = ? and status = ? and current_num != 0 order by price ?';
        const filledQuery = query.replace('?', sellerId).replace('?', 0).replace('?', orderBy);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async getWineBySellerIdOrderByVintage(sellerId, orderBy) {
        const query = 'SELECT * FROM wine WHERE seller_id = ? and status = ? and current_num != 0 order by vintage ?';
        const filledQuery = query.replace('?', sellerId).replace('?', 0).replace('?', orderBy);
        const [rows, fields]  = await pool.query(filledQuery);
        return rows;
    },

    async sellWine(wineId,wineName,price,intro,sellerId,currentNum,picName,vintage) {
        const result = await pool.query('INSERT INTO wine (wine_id,wine_name,price,intro,seller_id,current_num,status,pic_name,vintage) VALUES (?,?,?,?,?,?,?,?,?)', [wineId,wineName,price,intro,sellerId,currentNum,0,picName,vintage]);
        return result[0].insertId;
    },

    async updateWine(wineId,wineName,price,intro,currentNum,picName){
        const result = await pool.query('UPDATE  wine  SET wine_name = ?, intro = ? ,price = ?, current_num =?, pic_name = ? WHERE wine_id = ?', [wineName,intro,price,currentNum,picName,wineId]);
        return result;
    },

    async updateWineNum(wineId,currentNum){
        const result = await pool.query('UPDATE  wine  SET current_num =? WHERE wine_id = ?', [currentNum,wineId]);
        return result;
    },

    async deleteWine(wineId){
        const result = await pool.query('UPDATE  wine  SET status = ? WHERE wine_id = ?', [1,wineId]);
        return result;
    },

}

module.exports = Wine;