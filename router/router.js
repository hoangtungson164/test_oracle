var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var BankController = require('../controller/BankController')
var AuthController = require('../controller/AuthController')

router.get('/banks', BankController.getAllBank);
router.get('/banks/:id/consent', BankController.getAllConsensus);
router.get('/banks/:id/report', BankController.getAllReport);
router.post('/loginOracle', AuthController.loginOracle);

module.exports = router