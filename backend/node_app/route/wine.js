const express = require("express");
const router = express.Router();
const wineController = require("../controllers/wineController");


// $route get wine/getAllWine
// @access public
router.get("/getAllWine",wineController.getAllWine);

// $route get wine/getAllWineByPrice
// @access public
router.get("/getAllWineByPrice",wineController.getAllWineByPrice);

// $route get wine/getAllWineByVintage
// @access public
router.get("/getAllWineByVintage",wineController.getAllWineByVintage);


// $route post wine/getWineBySellerId
// @access public
router.post("/getWineBySellerId",wineController.getWineBySellerId);

// $route get wine/getWineBySellerIdOrderByPrice
// @access public
router.get("/getWineBySellerIdOrderByPrice",wineController.getWineBySellerIdOrderByPrice);

// $route get wine/getWineBySellerIdOrderByVintage
// @access public
router.get("/getWineBySellerIdOrderByVintage",wineController.getWineBySellerIdOrderByVintage);

// $route post wine/getWineByWineId
// @access public
router.post("/getWineByWineId",wineController.getWineByWineId);

// $route post wine/SellWine
// @access public
router.post("/sellWine",wineController.sellWine);

// $route post wine/UpdateWine
// @access public
router.post("/updateWine",wineController.updateWine);

// $route post wine/DeleteWine
// @access public
router.post("/deleteWine",wineController.deleteWine);


module.exports = router;
