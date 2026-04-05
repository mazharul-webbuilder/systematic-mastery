const createApp = require('./app');
const connectDB = require('./config/db');

const hostname = '127.0.0.1';
const port = 3001;

async function main() {
  await connectDB();

  const server = createApp();

  server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port + '/');
  });
}

main();
