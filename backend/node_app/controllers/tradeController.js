
const amqp = require('amqplib');
const Trade = require('../models/trade');
const Transaction = require('../models/transaction');
const Contract = require('../models/contract');
const { ethers, JsonRpcProvider } = require('ethers');
const jwt = require('jsonwebtoken');

// publish selll/trade event
async function publishRequest(request){
    try {
        const connection = await amqp.connect('amqp://localhost'); // RabbitMQ 
        const channel = await connection.createChannel();
        // declare queue
        await channel.assertQueue('trade_queue', { durable: false });
        channel.sendToQueue('trade_queue', Buffer.from(JSON.stringify(request)));
        console.log('ConectRabbitMQ'); 
        return channel; 
      } catch (error) {
        console.error('RabbitMQ Connects Falis:', error);
      }
}

async function addTrade(req, res){

    const tradeRequest = req.body;
    const token =  req.cookies.token;
    console.log("jwt token: "+token); 

    const decoded = jwt.verify(token, '12345678');
    const userId = decoded.id;
    console.log("jwt decoded user id: "+ userId);
    console.log(JSON.stringify(tradeRequest));
    
    tradeRequest.trader_id = userId;
    publishRequest(tradeRequest);
    return res.status(200).json({ message: 'Add Trade Successfully'});
}

async function matchSellTrader(tradeId,tradeType,tokenType,sellerId, num, price){
    let contractAddress,contractABI
    const existingContract = await Contract.findContract(3);
    if (!existingContract) {
        return res.status(400).json({ message: 'No revelant contract!'});
    }else{
        contractAddress = existingContract.contract_address;
        contractABI = JSON.parse(existingContract.contract_abi);
    }

    const infuraUrl = 'https://goerli.infura.io/v3/1211811ac81543619d2c621147ff348c'; 
    const privateKey = '50af1ebb227d308480dd29456aae363a4c89b566d41f310656a7a5f6e5597dcc';
    const provider = new JsonRpcProvider(infuraUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const createTime = new Date();
    await Trade.addSellTrade(tradeId,tradeType,tokenType,sellerId, num, price,createTime);
    let currentNum = num;
    while(currentNum > 0){     
        const trade = await Trade.matchSellTrader(price)
        if (!trade){
            break;
        }
        const matchTradeId = trade.trade_id;
        let matchNum = 0;
        if (trade.current_num > currentNum){
            matchNum = currentNum;
            try {
                const res1 = await contract.fillOrder(tradeId,matchNum);
                await res1.wait();
                const res2 = await contract.fillOrder(matchTradeId,matchNum);
                await res1.wait();
                } catch (error) {
                    console.error("调用时出错:", error);
            }
            console.log("match order id :",trade.trade_id,"trade current num:",trade.current_num,"match num:",matchNum);
            await Trade.updateTrade(matchTradeId,trade.current_num - matchNum,1);
            currentNum = 0;
        }else{
            matchNum  = trade.current_num;
            try {
                const res1 = await contract.fillOrder(tradeId,matchNum);
                await res1.wait();
                const res2 = await contract.fillOrder(matchTradeId,matchNum);
                await res2.wait();
                } catch (error) {
                    console.error("调用时出错:", error);
            }
            currentNum = currentNum - trade.current_num;
            console.log("match order id :",trade.trade_id,"trade current num:",trade.current_num,"match num:",matchNum);
            await Trade.updateTrade(matchTradeId,0,2);
        }
        const transactionTime = new Date();

        await Transaction.addTransaction(1,tokenType,sellerId,trade.trader_id,matchNum,price,transactionTime);
    }
    if(currentNum != num){
        if (currentNum == 0){
            await Trade.updateTrade(tradeId,currentNum,2);
        }else{
            await Trade.updateTrade(tradeId,currentNum,1);
        }
    }
}

async function matchBuyTrader(tradeId,tradeType,tokenType,buyerId, num, price){
     let contractAddress,contractABI
     const existingContract = await Contract.findContract(3);
     if (!existingContract) {
         return res.status(400).json({ message: 'No revelant contract!'});
     }else{
         contractAddress = existingContract.contract_address;
         contractABI = JSON.parse(existingContract.contract_abi);
     }
 
 
     const infuraUrl = 'https://goerli.infura.io/v3/1211811ac81543619d2c621147ff348c'; 
     const privateKey = '50af1ebb227d308480dd29456aae363a4c89b566d41f310656a7a5f6e5597dcc';
     const provider = new JsonRpcProvider(infuraUrl);
     //const contract = new ethers.Contract(contractAddress, contractABI,provider);
     const wallet = new ethers.Wallet(privateKey, provider);
     const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const createTime = new Date();
    await Trade.addBuyTrade(tradeId,tradeType,tokenType,buyerId, num, price,createTime);
    let currentNum = num;
    while(currentNum > 0){     
         const trade = await Trade.matchBuyTrader(price)
         if (!trade){
            break;
        }
         const matchTradeId = trade.trade_id;
         let matchNum = 0;
         if (trade.current_num > currentNum){
            matchNum = currentNum;
            try {
                const res1 = await contract.fillOrder(tradeId,matchNum);
                await res1.wait();
                const res2 = await contract.fillOrder(matchTradeId,matchNum);
                await res2.wait();
                } catch (error) {
                    console.error("调用时出错:", error);
            }
            await Trade.updateTrade(matchTradeId,trade.current_num - matchNum,1);
            currentNum = 0;
         }else{
            matchNum  = trade.current_num;
            try {
                const res1 = await contract.fillOrder(tradeId,matchNum);
                await res1.wait();
                const res2 = await contract.fillOrder(matchTradeId,matchNum);
                await res2.wait();
                } catch (error) {
                    console.error("调用时出错:", error);
            }
            currentNum = currentNum - trade.current_num;
            await Trade.updateTrade(matchTradeId,0,2);
         }
         const transactionTime = new Date();
         await Transaction.addTransaction(1,tokenType,trade.trader_id,buyerId,matchNum,trade.price,transactionTime);
    }
    if(currentNum != num){
        console.log("cuurent num = ",currentNum);
        if (currentNum == 0){
            await Trade.updateTrade(tradeId,currentNum,2);
        }else{
            await Trade.updateTrade(tradeId,currentNum,1);
        }
    }
}

async function getBuyTrade(req, res){
    const buyTrades  =  await Trade.getBuyTrade();
    return res.status(200).json({ buyTrades:buyTrades});
}

async function getSellTrade(req, res){
    const sellTrades  =  await Trade.getSellTrade();
    return res.status(200).json({ sellTrades:sellTrades});
}

async function cancelTrade(req, res){
    const { trade_id } = req.body;
    const result  =  await Trade.cancelTrade(trade_id);
    return res.status(200).json({ cancel_result:result});
}

async function getTradeById(req, res){
   // const trader_id = req.query.trader_id;
    const token =  req.cookies.token;
    //console.log("jwt token: "+token); 
    const decoded = jwt.verify(token, '12345678');
    const traderId = decoded.id;
    const trades  =  await Trade.getTradeById(traderId);

    //const trades  =  await Trade.getTradeById(trader_id);
    return res.status(200).json({ trades:trades});
}

module.exports = {addTrade,matchSellTrader,matchBuyTrader,getBuyTrade,getSellTrade,cancelTrade,getTradeById};

