# Node.js HTTP & HTTPS Modules

This repository demonstrates how to build **HTTP and HTTPS servers and clients** using Node.js native modules.  
Understanding these modules is essential for building APIs, web servers, and real-time applications without frameworks.

---

## Table of Contents

- [Introduction](#introduction)
- [Creating HTTP Server](#creating-http-server)
- [Handling Requests & Responses](#handling-requests--responses)
- [HTTP Client Requests](#http-client-requests)
- [HTTPS Server](#https-server)
- [Streaming & Buffers with HTTP](#streaming--buffers-with-http)
- [Use Cases](#use-cases)
- [References](#references)

---

## Introduction

Node.js provides built-in modules to handle web traffic:

```js
import http from 'node:http';
import https from 'node:https';
```

These allow you to:

- Create servers

- Handle requests/responses

- Send client requests

- Work with streams and buffers

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.js HTTP Server!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

```

### Handling Requests & Responses

- req (IncomingMessage) → Read request data

- res (ServerResponse) → Send response

```js
server.on('request', (req, res) => {
    if (req.url === '/hello') {
        res.end('Hello world');
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

```

### HTTP Client Requests

```js
import http from 'node:http';

http.get('http://www.example.com', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});

```

### HTTPS Server

```js
import https from 'node:https';
import fs from 'fs';

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.end('Hello Secure World!');
});

server.listen(3443, () => console.log('HTTPS server running on port 3443'));

```

### Streaming & Buffers with HTTP

```js
import fs from 'fs';
import http from 'node:http';

http.createServer((req, res) => {
    const fileStream = fs.createReadStream('./largefile.txt');
    fileStream.pipe(res); // stream file directly to response
}).listen(3000);

```

### Use Cases

- CBuilding APIs and microservices
- CServing static files or media
- CHandling file uploads/downloads

- Creating lightweight real-time servers