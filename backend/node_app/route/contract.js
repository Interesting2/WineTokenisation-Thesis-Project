const express = require("express");
const router = express.Router();
const path = require('path');
const contractController = require("../controllers/contractController");

// jump to contract test page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'transfer.html'));
});

router.get('/getContract', contractController.getContract);

module.exports = router;