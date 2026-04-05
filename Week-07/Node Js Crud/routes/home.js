function homeHandler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello! Welcome to my API. This is a greeting from raw Node.j asdf sdfgss!');
}

module.exports = homeHandler;
