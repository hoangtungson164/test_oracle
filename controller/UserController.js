const oracleService = require('../service/oracelQuery.service');
const bcrypt = require('bcryptjs');
const dateUtil = require('../util/dateConvert.util');

exports.insertUser = async function (req, res) {
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password);
    let bankCode = req.body.bankCode;
    let sysdate = dateUtil.timeStamp();
    console.log('something');
    let optionCommit = {autoCommit: true};
    let INSERT = "INSERT INTO TB_ITUSER(USER_NM, USER_PW, INOUT_GB, CUST_CD, SYS_DTIM) VALUES (:USER_NM, :USER_PW, :INOUT_GB, :CUST_CD, :SYS_DTIM)";
    let values = [username, password, '2', bankCode, sysdate];
    await oracleService(res, INSERT, values, optionCommit);
    
};
