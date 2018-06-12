// reference: https://jsao.io/2018/03/creating-a-rest-api-database-basics/

module.exports = {
  hrPool: {
    user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING,

    // default thread pool size = 4

    // this allows 10 connections in the pool to be able to work at the same time
    poolMin: 10,
    poolMax: 10,
    // pool size fixed
    poolIncrement: 0
  }
};