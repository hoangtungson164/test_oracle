let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let BankController = require('../controller/BankController')
let UserController = require('../controller/UserController')
let RestartController = require('../controller/RestartController');

router.get('/banks', BankController.getAllBank);
router.get('/banks/:id/consent', BankController.getAllConsensus);
router.get('/banks/:id/report', BankController.getAllReport);
router.post('/insertUser', UserController.insertUser);
router.post('/restart', RestartController.restartCMD);

module.exports = router