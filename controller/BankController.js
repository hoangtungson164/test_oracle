var con = require('../config/db');
const oracledb = require('oracledb');
const oracleService = require('../service/oracelQuery.service');

var optionSelect = { outFormat: oracledb.OUT_FORMAT_OBJECT };
var params = {}


exports.getAllBank = function (req, res) {
    var sql = "SELECT*FROM TB_CUSTOMER";
    oracleService.queryOracel(res, sql, params, optionSelect);
};

exports.getAllConsensus = function (req, res) {
    var sql = "SELECT*FROM bankContract WHERE bank_id = " + req.params.id;
    oracleService.queryOracel(res, sql, params, optionSelect);
}

exports.getAllReport = function (req, res) {
    var sql = "SELECT*FROM reports"
    oracleService.queryOracel(res, sql, params, optionSelect);
}
