const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


// $route POST users/register
// @access public
router.post("/register",userController.register);

// $route POST users/sendCode
// @access public
router.post("/sendCode",userController.sendCode);

// $route POST users/verify
// @access public
router.post("/verify",userController.verify);

// $route POST users/verifyUser
// @access public
router.post("/verify-user",userController.verifyUser);

// $route get users/is-email-verified
// @access public
router.get("/is-email-verified",userController.checkIsEmailVerified);

// $route POST users/login
// @access public
router.post("/login",userController.login);

// $route POST users/login
// @access public
router.post("/logout",userController.logout);

// $route Get users/getAccountTokenInfo
// @access public
router.get("/getAccountTokenInfo",userController.getAccountTokenInfo);


module.exports = router;
