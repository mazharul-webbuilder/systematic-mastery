const createApp = require('./app');

const hostname = '127.0.0.1';
const port = 3001;

const server = createApp();

setTimeout(() => {
  console.log('Called after 10 seceonds')
}, 10000)

server.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
