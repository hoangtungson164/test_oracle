const oracledb = require('oracledb');
const dbconfig = require('../config/auth');

async function queryOracel(res, sql, param, option) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            sql, param, option);
        res.status(200).send(result.rows);   
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (connection) {
            try {
                console.log('close connection')
                await connection.close();
            } catch (error) {
                res.status(500).send("Problem with closing connection");
            }
        }
    }
}

module.exports.queryOracel = queryOracel;