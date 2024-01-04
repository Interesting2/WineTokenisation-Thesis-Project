const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/tradeController");


// $route POST trade/sellTrade
// @access public
router.post("/addTrade",tradeController.addTrade);

// $route Get trade/getBuyTrade
// @access public
router.get("/getBuyTrade",tradeController.getBuyTrade);

// $route Get trade/getSellTrade
// @access public
router.get("/getSellTrade",tradeController.getSellTrade);

// $route Post trade/cancelTrade
// @access public
router.post("/cancelTrade",tradeController.cancelTrade);

// $route get trade/getTradeById
// @access public
router.get("/getTradeById",tradeController.getTradeById);

module.exports = router;