# Node.js Streams

The **Stream API in Node.js**, a core concept for handling large data efficiently. Streams allow reading or writing data **piece by piece** instead of loading everything into memory, making your applications fast and memory-efficient.

---

## Table of Contents

- [Introduction](#introduction)
- [Stream Types](#stream-types)
- [Basic Usage](#basic-usage)
- [Transform Streams](#transform-streams)
- [Use Cases](#use-cases)

---

## Introduction

Streams are objects that let you read data from a source or write data to a destination **incrementally**. They are widely used in Node.js for:

- File handling
- HTTP requests/responses
- Real-time data processing
- Piping and data transformations

---

## Stream Types

| Type       | Direction    | Example Use Case           |
|------------|-------------|---------------------------|
| Readable   | Input       | Reading a file line by line |
| Writable   | Output      | Writing to a file           |
| Duplex     | Both        | TCP sockets, WebSockets     |
| Transform  | Both + modify | Compression, encryption     |

---

## Basic Usage

### Reading a File (Readable Stream)
```js
import fs from 'fs';

const readStream = fs.createReadStream('./bigfile.txt', { encoding: 'utf-8' });

readStream.on('data', chunk => {
    console.log('New chunk:', chunk.slice(0, 30)); // first 30 characters
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', err => {
    console.error('Read error:', err);
});
```
### Writing to a File (Writable Stream)
```js
import fs from 'fs';

const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

writeStream.write('Hello Node Streams!\n');
writeStream.write('Writing line by line.\n');
writeStream.end('Finished writing.');

writeStream.on('finish', () => {
    console.log('All data written!');
});

```

### Transform Streams
Transform streams allow you to read, modify, and write data in a single pipeline. Example: converting text to uppercase while reading a file:
```js
import fs from 'fs';
import { Transform } from 'stream';

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

fs.createReadStream('./input.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('./output.txt'));

```
### Use Cases
- Processing large log files without running out of memory
- Streaming video/audio content to clients
- Building real-time pipelines (e.g., chat messages, analytics)
- Integrating compression or encryption in file transfers