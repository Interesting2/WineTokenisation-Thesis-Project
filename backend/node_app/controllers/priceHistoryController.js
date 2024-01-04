const PriceHistory = require('../models/priceHistory');

// get price history
async function getPriceHistory(req,res) {
    const startTime =  req.query.start_time;
    const endTime =  req.query.end_time;
    const start = new Date(startTime).getTime()/1000;
    const end = new Date(endTime).getTime()/1000;
    const priceHistories = await PriceHistory.getPriceHistory(start,end);
    return res.status(200).json({ priceHistories:priceHistories});
    
}

module.exports = { getPriceHistory};