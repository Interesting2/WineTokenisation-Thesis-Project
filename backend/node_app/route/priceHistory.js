const express = require("express");
const router = express.Router();
const priceHistoryController = require("../controllers/priceHistoryController");

// $route Get priceHistory/getPriceHistory
// @access public
router.get("/getPriceHistory",priceHistoryController.getPriceHistory);


module.exports = router;