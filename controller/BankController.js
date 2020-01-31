const oracledb = require('oracledb');
const oracleService = require('../service/oracelQuery.service');
const scrService = require('../service/scrlog.service');

const optionAutoCommit = { autoCommit: true };
const convertTime = require('../service/datecreate.service');
const common_service = require('../service/common.service');
const nicekey = require('../service/niceSessionKey.service')

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}

exports.getAllBank = function (req, res) {
    let SELECT = "SELECT TB_ITCUST.CUST_GB, TB_ITCUST.CUST_CD, TB_ITCUST.CUST_NM_ENG FROM TB_ITCUST";
    let JOIN = " JOIN TB_ITCTRT ON TB_ITCUST.CUST_GB = TB_ITCTRT.CUST_GB";
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

exports.postIndi_info = function (req, res) {
    let NICE_SSIN_ID = convertTime.timeStamp2();

    let producCode = nicekey.niceProductCode(req.cicGoodCode);

    common_service.getSequence().then(resSeq => {
        NICE_SSIN_ID = convertTime.timeStamp2() + resSeq[0].SEQ;
    })

    let sql = "INSERT INTO TB_SCRPLOG (LOGIN_ID, SYS_DTIM, NICE_SSIN_ID) VALUES (:LOGIN_ID, :SYS_DTIM, :NICE_SSIN_ID)"
    let sql2 = "INSERT INTO TB_INQLOG (TX_GB_CD, INQ_DTIM, INQ_LOG_ID, AGR_FG, SYS_DTIM, WORK_ID)" +
    "VALUES (:TX_GB_CD, :INQ_DTIM, :INQ_LOG_ID, :AGR_FG, :SYS_DTIM, :WORK_ID)"
 
    let params = [req.body.FULL_NAME, convertTime.timeStamp(), producCode + NICE_SSIN_ID]
    let params2 = [req.body.FULL_NAME, convertTime.timeStamp(), NICE_SSIN_ID]

    scrService.queryOracel(res, sql, params, optionSelect);
    scrService.queryOracel(res, sql2, params2, optionSelect);
}
