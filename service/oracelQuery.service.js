const oracledb = require('oracledb');
const dbconfig = require('../config/auth');


async function queryOracel(res, sql, param, option) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        result = await connection.execute(
            sql, param, option);
            if (!(result.rows === undefined)) {
                res.status(200).send(result.rows)
            } else {
                res.status(200).send(result);
            }
    } catch (err) {
        res.send({error: 1});
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports.queryOracel = queryOracel;