var config = require('../config/config');
var authService = require('../service/auth.service')
const IUser = require('../domain/IUser');
const validation = require('../util/validation');
const oracleService = require('../service/oracelQuery.service');
const bcrypt = require('bcryptjs');


exports.loginOracle = function (req, res) {
    var username = req.body.username;
    var password = bcrypt.hashSync(req.body.password);
    console.log('something');
    let optionCommit = {autoCommit: true};
    let INSERT = "INSERT INTO TB_ITUSER(USER_NM, USER_PW, INOUT_GB, CUST_CD, SYS_DTIM) VALUES (:USER_NM, :USER_PW, :INOUT_GB, :CUST_CD, :SYS_DTIM)";
    let values = [username, password, '2', 'B1234545', '20200207'];
    try {
        oracleService(res, INSERT, values, optionCommit);
    } catch (e) {
        console.log(e);
    }
};
