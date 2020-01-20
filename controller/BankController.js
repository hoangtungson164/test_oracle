const oracledb = require('oracledb');
const oracleService = require('../service/oracelQuery.service');
const optionAutoCommit = { autoCommit: true };
var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}


exports.getAllBank = function (req, res) {
    var SELECT = "SELECT TB_ITCUST.CUST_GB, TB_ITCUST.CUST_CD, TB_ITCUST.CUST_NM_ENG FROM TB_ITCUST";
    var JOIN = " JOIN TB_ITCTRT ON TB_ITCUST.CUST_CD = TB_ITCTRT.CUST_CD";
    var WHERE = " WHERE TB_ITCTRT.GDS_CD = 'S1003'";
    var sql = SELECT + JOIN + WHERE;
    oracleService.queryOracel(res, sql, params, optionSelect);
};

exports.getAllConsensus = function (req, res) {
    var sql = "SELECT TO_CHAR(COLLECTION), TO_CHAR(DATA_USING), TO_CHAR(PROVIDING) FROM TB_CONSENT_TYPE  WHERE CUST_GB = " + "'" + req.params.id + "'";
    oracleService.queryOracel(res, sql, params, optionSelect);
}

exports.getAllReport = function (req, res) {
    var SELECT = "SELECT*FROM TB_REPORT";
    var JOIN = " JOIN TB_CUST_REPORT ON TB_REPORT.REPORT_CODE = TB_CUST_REPORT.REPORT_CODE";
    var WHERE = " WHERE TB_CUST_REPORT.CUST_GB = " + "'" + req.params.id + "'";
    var sql = SELECT + JOIN + WHERE; 
    oracleService.queryOracel(res, sql, params, optionSelect);
}

exports.postIndi_info = function (req, res) {
    var FULL_NAME = req.body.FULL_NAME;
    var NATIONAL_ID = req.body.NATIONAL_ID;
    var CONSENT_ID = req.body.CONSENT_ID;
    var CUST_GB = req.body.CUST_GB;
    var sql = "INSERT INTO TB_INDI_INFO VALUES (:FULL_NAME, :NATIONAL_ID, :CONSENT_ID, :CUST_GB)"
    var params = {
        FULL_NAME: {val: FULL_NAME}, 
        NATIONAL_ID: {val: NATIONAL_ID}, 
        CONSENT_ID: {val: CONSENT_ID}, 
        CUST_GB: {val: CUST_GB}
    };
    oracleService.queryOracel(res, sql, params, optionAutoCommit);
}
