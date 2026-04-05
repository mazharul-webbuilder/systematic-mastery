const http = require('http');
const homeHandler = require('./routes/home');

function createApp() {
  return http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
      homeHandler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });
}

module.exports = createApp;
