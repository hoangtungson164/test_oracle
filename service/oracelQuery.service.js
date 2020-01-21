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
            } else {
                res.status(200).send(result);
            }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                res.status(500).send("Problem with close connection");
            }
        }
    }
}

module.exports.queryOracel = queryOracel;