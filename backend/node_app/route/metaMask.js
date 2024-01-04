const express = require("express");
const router = express.Router();
const path = require('path');

// jump to metaMask page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'metamask.html'));
});

// get account balance
router.get('/getBalance', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'getBalance.html'));
});

router.get('/transfer', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'transfer.html'));
});

module.exports = router;