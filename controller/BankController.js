const oracledb = require('oracledb');
const oracleService = require('../service/oracelQuery.service');

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}


exports.getAllBank = function (req, res) {
    let SELECT = "SELECT TB_ITCUST.CUST_GB, TB_ITCUST.CUST_CD, TB_ITCUST.CUST_NM_ENG FROM TB_ITCUST";
    let JOIN = " JOIN TB_ITCTRT ON TB_ITCUST.CUST_CD = TB_ITCTRT.CUST_CD";
    let WHERE = " WHERE TB_ITCTRT.GDS_CD = 'S1003'";
    let ORDER = " ORDER BY TB_ITCUST.CUST_NM_ENG";
    let sql = SELECT + JOIN + WHERE + ORDER;
    oracleService.queryOracel(res, sql, params, optionSelect);
};

exports.getAllConsensus = function (req, res) {
    let SELECT = "SELECT TO_CHAR(COLLECTION), TO_CHAR(DATA_USING), TO_CHAR(PROVIDING) FROM TB_CONSENT_TYPE";
    let WHERE = " WHERE CUST_GB = " + "'" + req.params.id + "'";
    let sql = SELECT + WHERE;
    oracleService.queryOracel(res, sql, params, optionSelect);
}

exports.getAllReport = function (req, res) {
    let SELECT = "SELECT*FROM TB_REPORT";
    let JOIN = " JOIN TB_CUST_REPORT ON TB_REPORT.REPORT_CODE = TB_CUST_REPORT.REPORT_CODE";
    let WHERE = " WHERE TB_CUST_REPORT.CUST_GB = " + "'" + req.params.id + "'";
    let sql = SELECT + JOIN + WHERE;
    oracleService.queryOracel(res, sql, params, optionSelect);
}

