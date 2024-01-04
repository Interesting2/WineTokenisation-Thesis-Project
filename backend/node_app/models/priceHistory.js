const { pool}  = require('../server');


// PriceHistory model
const PriceHistory = {

    async getPriceHistory(startTime,endTime) {
        //console.log('start_time is :',startTime,  'end_time is:',endTime);
        const [rows, fields] = await pool.query('SELECT * FROM price_history WHERE time > ? and time <= ?', [startTime,endTime]);
        return rows;
    },

}

module.exports = PriceHistory;