const oracledb = require('oracledb');
const oracleService = require('../service/oracelQuery.service');

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}


exports.getAllBank = async function (req, res) {
    let SELECT = "SELECT TB_ITCUST.CUST_GB, TB_ITCUST.CUST_CD, TB_ITCUST.CUST_NM_ENG FROM TB_ITCUST";
    let JOIN = " JOIN TB_ITCTRT ON TB_ITCUST.CUST_GB = TB_ITCTRT.CUST_GB AND TB_ITCUST.CUST_CD = TB_ITCTRT.CUST_CD AND TB_ITCUST.VALID_START_DT = TB_ITCTRT.VALID_START_DT";
    let WHERE = " WHERE TB_ITCTRT.GDS_CD = 'S1003'";
    let ORDER = " ORDER BY TB_ITCUST.CUST_NM_ENG";
    let sql = SELECT + JOIN + WHERE + ORDER;
    await oracleService(res, sql, params, optionSelect);
};

exports.getAllConsensus = async function (req, res) {
    let SELECT = "SELECT TO_CHAR(COLLECTION), TO_CHAR(DATA_USING), TO_CHAR(PROVIDING) FROM TB_CONSENT_TYPE";
    let WHERE = " WHERE CUST_GB = " + "'" + req.params.id + "'";
    let sql = SELECT + WHERE;
    await oracleService(res, sql, params, optionSelect);
}

exports.getAllReport = async function (req, res) {
    let SELECT = "SELECT*FROM TB_REPORT";
    let JOIN = " JOIN TB_CUST_REPORT ON TB_REPORT.REPORT_CODE = TB_CUST_REPORT.REPORT_CODE";
    let WHERE = " WHERE TB_CUST_REPORT.CUST_GB = " + "'" + req.params.id + "'";
    let sql = SELECT + JOIN + WHERE;
    await oracleService(res, sql, params, optionSelect);
}

