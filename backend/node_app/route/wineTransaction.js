const express = require("express");
const router = express.Router();
const wineTransactionController = require("../controllers/wineTransactionController");


// $route post wineTransaction/addWineTransaction
// @access public
router.post("/addWineTransaction",wineTransactionController.addWineTransaction);

// $route get wineTransaction/getWineTransactionByWineId
// @access public
router.get("/getWineTransactionByWineId",wineTransactionController.getWineTransactionByWineId);

// $route get wineTransaction/getWineTransactionByBuyerId
// @access public
router.get("/getWineTransactionByBuyerId",wineTransactionController.getWineTransactionByBuyerId);

// $route get wineTransaction/getWineTransactionBySellerId
// @access public
router.get("/getWineTransactionBySellerId",wineTransactionController.getWineTransactionBySellerId);

module.exports = router;