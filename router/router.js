var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var verifyToken = require('../service/verifyToken.js')

var AuthController = require('../controller/AuthController');
var BankController = require('../controller/BankController')

router.get('/banks', BankController.getAllBank);
router.get('/banks/:id/consent', BankController.getAllConsensus);
router.post('/login', AuthController.login);
router.get('/banks/:id/report', BankController.getAllReport);
router.post('/indi', BankController.postIndi_info);

module.exports = router