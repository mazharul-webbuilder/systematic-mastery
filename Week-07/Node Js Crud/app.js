const http = require('http');
const homeHandler = require('./routes/home');
const userRoutes = require('./routes/users');

function createApp() {
  return http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }

    // Home routes
    if (req.url === '/' || req.url === '/home') {
      return homeHandler(req, res);
    }

    // User routes (need body parsing)
    if (req.url.startsWith('/users')) {
      return parseBody(req, () => {
        const handled = userRoutes(req, res);
        if (!handled) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Not Found' }));
        }
      });
    }

    res.statusCode = 404;
    res.end('Not Found');
  });
}


function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      req.body = {};
    }
    callback();
  });
}

module.exports = createApp;
