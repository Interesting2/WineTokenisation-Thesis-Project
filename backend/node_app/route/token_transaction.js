const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");


// $route Get transaction/getBuyTransaction
// @access public
router.get("/getBuyTransaction",transactionController.getBuyTransaction);

// $route GET transaction/getSellTransaction
// @access public
router.get("/getSellTransaction",transactionController.getSellTransaction);

// $route GET transaction/getAllTransaction
// @access public
router.get("/getAllTransaction",transactionController.getAllTransaction);

// $route GET transaction/getAggregateTransaction
// @access public
router.get("/getAggregateTransaction",transactionController.getAggregateTransaction);

// $route POST transaction/addTransaction
// @access public
router.post("/addTransaction",transactionController.addTransaction);

module.exports = router;