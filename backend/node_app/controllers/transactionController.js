const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

// Add Transaction
async function addTransaction(req, res) {
    const { transaction_type, token_type,seller_id,buyer_id,token_num,value} = req.body;
    // get transaction complete date
    const transactionTime = new Date();
    // add transaction
    const result = await Transaction.addTransaction(transaction_type, token_type,seller_id,buyer_id,token_num,value,transactionTime);

    // return registration message
    return res.status(200).json({ message: 'Successfully Record Transaction',result:result});
}

// Get Buy Transaction
async function getBuyTransaction(req, res) {
    const token =  req.cookies.token;
    const decoded = jwt.verify(token, '12345678');
    const buyerId = decoded.id;
    const transactions = await Transaction.getBuyTransaction(buyerId);
    return res.status(200).json({ transactions:transactions});
}

// Get Sell Transaction
async function getSellTransaction(req, res) {
    const token =  req.cookies.token;
    const decoded = jwt.verify(token, '12345678');
    const sellerId = decoded.id;
    const transactions = await Transaction.getSellTransaction(sellerId);
    return res.status(200).json({ transactions:transactions});
}

// Get All Transaction
async function getAllTransaction(req, res) {
    const transactions = await Transaction.getAllTransaction();
    return res.status(200).json({ transactions:transactions});
}

// Get Aggregate Transaction
async function getAggregateTransaction(req, res) {
    const transactions = await Transaction.getAllTransaction();
    const rule = req.query.aggregate_rule

    // group transaction by rule
    const groupedTransactions = transactions.reduce((groups, transaction) => {
        const transactionTime = transaction.transaction_time.getTime();
        const groupKey = Math.floor(transactionTime /1000/ rule) * rule; 
      
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
      
        groups[groupKey].push(transaction);
        return groups;
      }, {});

    // get max and min
    const priceStats = [];
    const keyList = [];
    let minGroupKey = Number.MAX_SAFE_INTEGER;
    for (const groupKey in groupedTransactions){
        minGroupKey = Math.min(minGroupKey,groupKey);
        keyList.push(groupKey);
    }
    keyList.reverse();
    //console.log(keyList);
    let timezoneOffsetInMinutes = new Date().getTimezoneOffset();
   //console.log(timezoneOffsetInMinutes);
    for (let i = 0;i < keyList.length;i++){
        if (priceStats.length >= 30){
            break;
        }
        groupKey = keyList[i];
        //console.log(groupKey);
        if (groupedTransactions.hasOwnProperty(groupKey)) {
          const transactionsInGroup = groupedTransactions[groupKey];
          const prices = transactionsInGroup.map(transaction => transaction.value);
          const maxPrice = Math.max(...prices);
          const minPrice = Math.min(...prices);
          const firstPrice = prices[0];
          const lastPrice = prices[prices.length - 1]; 
          const formmatDate = new Date(parseFloat(groupKey) * 1000).toLocaleString('en-AU',{hour12:false});
          //console.log(formmatDate);
          priceStats.push({ formmatDate, maxPrice, minPrice,firstPrice,lastPrice });
          let nextGroupKey = parseFloat(groupKey) - parseFloat(rule);
          while (nextGroupKey > minGroupKey && priceStats.length <= 30){
            if (!groupedTransactions[nextGroupKey]) {
                const nextFormmatDate = new Date(nextGroupKey * 1000 ).toLocaleString('en-AU',{hour12:false});
                priceStats.push({ formmatDate: nextFormmatDate, maxPrice: 0, minPrice: 0,firstPrice:0,lastPrice:0 });
                nextGroupKey = nextGroupKey - parseFloat(rule);
            }else{
                break;
            }
          }
          
        }
    }
    return res.status(200).json({ transactions:priceStats});
}

module.exports = { addTransaction,getBuyTransaction,getSellTransaction,getAllTransaction,getAggregateTransaction};