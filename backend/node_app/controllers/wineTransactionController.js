const WineTransaction = require('../models/wineTransaction');
const Wine = require('../models/wine');
const jwt = require('jsonwebtoken');

async function addWineTransaction(req, res) {
    console.log('ADD wine Transaction')
    const {wine_id,seller_id,unit_price,num} = req.body;

    const token =  req.cookies.token;
    const decoded = jwt.verify(token, '12345678');
    const buyer_id = decoded.id;

    const transactionTime = new Date();
    const wine = await Wine.getWineByWineId(wine_id);
    const currentNum = wine.current_num - num;
    await Wine.updateWineNum(wine_id,currentNum);
    const wineTransactionId = await WineTransaction.addWineTransaction(wine_id,seller_id,buyer_id,unit_price,num,transactionTime)

    return res.status(200).json({ wineTransactionId:wineTransactionId});
}

async function getWineTransactionByWineId(req, res) {
    const wineId = req.query.wine_id;
    const wineTransactions = await WineTransaction.getWineTransactionByWineId(wineId);
    return res.status(200).json({ wineTransactions :wineTransactions});
}

async function getWineTransactionByBuyerId(req, res) {
    const token =  req.cookies.token;
    const decoded = jwt.verify(token, '12345678');
    const buyerId = decoded.id;
    // const buyerId = req.query.buyer_id;
    const wineTransactions = await WineTransaction.getWineTransactionByBuyerId(buyerId);
    return res.status(200).json({ wineTransactions :wineTransactions});
}

async function getWineTransactionBySellerId(req, res) {
    const token =  req.cookies.token;
    if (token === undefined) {
        return res.status(400).json({message: "Token is empty"})
    }
    const decoded = jwt.verify(token, '12345678');
    const sellerId = decoded.id;
    // const sellerId = req.query.seller_id;
    const wineTransactions = await WineTransaction.getWineTransactionBySellerId(sellerId);
    return res.status(200).json({ wineTransactions :wineTransactions});
}


module.exports = { addWineTransaction,getWineTransactionByWineId,getWineTransactionByBuyerId,getWineTransactionBySellerId};