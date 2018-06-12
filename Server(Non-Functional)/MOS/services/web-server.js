//Reference: https://dzone.com/articles/creating-a-rest-api-web-server-basics

// required modules
const http = require('http');
const express = require('express'); // needed to be installed via npm
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');
const morgan = require('morgan'); // used for web server logging
const router = require('./router.js');

let httpServer;

// initializing a server, return a respond based on the success of starting a server
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express(); // create a new express application
    httpServer = http.createServer(app); // create an HTTP server with HTTP module
    
    // this will create a pipline of middleware functions that can interact
    // with HTTP requests and responses
    app.use(morgan('combined'));
    app.use('/api', router);
    app.get('/', async (req, res) => {
      const result = await database.simpleExecute('select user, systimestamp from dual');
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;
 
      res.end(`DB user: ${user}\nDate: ${date}`);
    });

    // starts listening for incoming requests
    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Web server listening on localhost:${webServerConfig.port}`);
      resolve();
    });
  });
}

// exported so that the function can be invoked externally
module.exports.initialize = initialize;

// controlling the shutdown for server
function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => { // stop new connection(s), while existing connection(s) maintain
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
// promise returned upon the success of the server closing

// also exported, for external use
module.exports.close = close;