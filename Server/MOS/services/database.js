// reference: https://jsao.io/2018/03/creating-a-rest-api-database-basics/

// required modules
const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

// creates a internal connection pool cache as the "default" pool
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}

// exported for external use
module.exports.initialize = initialize;

// retrive the default pool and invokes close()
async function close() {
  await oracledb.getPool().close();
}
 
// exported for external use
module.exports.close = close;

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
 
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
 
    try {
      conn = await oracledb.getConnection();
 
      const result = await conn.execute(statement, binds, opts);
 
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}
 
// exported for external use
module.exports.simpleExecute = simpleExecute;