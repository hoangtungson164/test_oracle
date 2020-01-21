const oracledb = require('oracledb');
const dbconfig = require('../config/auth');


async function queryOracel(res, sql, param, option) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        let result = await connection.execute(
            sql, param, option);
            if (result.rows !== undefined) {
                res.status(200).send(result.rows)
            } else if(result.rows.length < 1) {
                res,status(204).send("Nothing to get")
            } else {
                res.status(200).send(result);
            }
    } catch (err) {
        res.status(500).send("err");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                res.status(500).send("Problem with closing connection");
            }
        }
    }
}

module.exports.queryOracel = queryOracel;