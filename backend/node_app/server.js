const express = require("express");
const mysql = require('mysql2/promise');
const bodyParser = require("body-parser");
const amqp = require('amqplib');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.port || 3500;

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow cookies
};
// Enable CORS for all routes
app.use(cors(corsOptions));


app.use(cookieParser());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'node_demo',
    waitForConnections: true,
});

// connect mysql db
pool.getConnection().then(() => console.log("Mysql connected!"));
module.exports = pool;

//consumer
const tradeController = require("./controllers/tradeController");
const consumeRequests = async () => {
    try {
      const connection = await amqp.connect('amqp://localhost'); // RabbitMQ server
      const channel = await connection.createChannel();
      await channel.assertQueue('trade_queue', { durable: false });
      channel.consume('trade_queue', (msg) => {
        const request = JSON.parse(msg.content.toString());
        console.log('receive request:', request);
        const traderId =  request.trader_id;
        const tradeId = request.trade_id;
        const num = request.num;
        const price = request.price;
        const tokenType = request.token_type
        if (request.trade_type == "sell"){
            tradeController.matchSellTrader(tradeId,'sell',tokenType,traderId, num, price)
        }else{
            tradeController.matchBuyTrader(tradeId,'buy',tokenType,traderId, num, price)
        }
        channel.ack(msg);
      });
    } catch (error) {
      console.error('RabbitMQ connection error:', error);
    }
};
  
  // start consumer
consumeRequests();

// import body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// homepage route
app.get("/",(req,res) => {
    res.send("Hello World!");
})

// import users.js
const users = require("./route/users");
app.use("/users",users);

// import metaMask.js
const metaMask = require("./route/metaMask");
app.use("/metaMask",metaMask);

// import contract.js
const contractRouter = require("./route/contract");
app.use("/contract",contractRouter);

// import transaction.js
const transactionRouter = require("./route/token_transaction");
app.use("/transaction",transactionRouter);

// import priceHistory.js
const priceHistoryRouter = require("./route/priceHistory");
app.use("/priceHistory",priceHistoryRouter);

// import trade.js
const tradeRouter = require("./route/trade");
app.use("/trade",tradeRouter);

// import wine.js
const wineRouter = require("./route/wine");
app.use("/wine",wineRouter);

// import wineTransaction.js
const wineTransactionRouter = require("./route/wineTransaction");
app.use("/wineTransaction",wineTransactionRouter);


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})