# Advanced Node.js Topics (Reference Guide)

This repository contains **optional but useful advanced Node.js topics**.  
These topics are not strictly required to start TypeScript/NestJS, but they are **helpful for production-ready backend applications**.

---

## Table of Contents

- [Child Processes / Worker Threads](#child-processes--worker-threads)
- [Cluster Module](#cluster-module)
- [Process & Environment Management](#process--environment-management)
- [Timers & Event Loop](#timers--event-loop)
- [Error Handling / Async Hooks](#error-handling--async-hooks)
- [Streams Advanced](#streams-advanced)
- [References](#references)

---

## Child Processes / Worker Threads

**Purpose:** Offload CPU-bound tasks or run separate Node processes.

### Example: Spawn a child process
```js
import { spawn } from 'child_process';

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
});

ls.stderr.on('data', (err) => {
    console.error(`Error: ${err}`);
});

ls.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
});
```
### Worker Threads
```js
import { Worker } from 'node:worker_threads';

const worker = new Worker('./workerThread.js');
worker.on('message', msg => console.log(msg));
worker.postMessage({ job: 'heavy-computation' });

```

### Cluster Module
- Enables running multiple Node.js processes across CPU cores.

- Useful for load balancing HTTP servers.
```js
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => res.end(`Worker ${process.pid}`)).listen(3000);
}

```

### Process & Environment Management

- Access environment variables and process info:
```js
console.log(process.env.NODE_ENV);
console.log(process.argv); // command-line arguments

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  process.exit(0);
});

```

### Timers & Event Loop Insights
```js
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));

```

### Error Handling & Async Hooks
- Global Error Handling
```js
process.on('uncaughtException', err => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', reason => console.error('Unhandled Rejection:', reason));

```

### Async Hooks (Advanced)

- Track asynchronous operations and lifecycle events.

- Useful for logging, tracing, or custom context management in production.
```js
import async_hooks from 'node:async_hooks';
const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) { console.log(asyncId, type); }
});
hook.enable();

```

### Advanced Streams
- Custom Transform Streams
```js
import { Transform } from 'node:stream';

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

```
- Pipeline & Backpressure Handling
```js
import { pipeline } from 'node:stream';
import fs from 'fs';

pipeline(
  fs.createReadStream('./input.txt'),
  upperCaseTransform,
  fs.createWriteStream('./output.txt'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Pipeline succeeded');
  }
);

```