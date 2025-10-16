# Node.js Buffers

This repository demonstrates the **Buffer class in Node.js**, a global type used for handling **binary data**
efficiently. Buffers are essential for working with streams, files, network protocols, and any situation where raw bytes
are involved.

---

## Table of Contents

- [Introduction](#introduction)
- [Creating Buffers](#creating-buffers)
- [Writing and Reading Data](#writing-and-reading-data)
- [Buffers and Streams](#buffers-and-streams)
- [Common Methods](#common-methods)
- [Use Cases](#use-cases)
- [References](#references)

---

## Introduction

A **Buffer** is a fixed-size chunk of memory that stores **raw binary data**. Unlike JavaScript strings or arrays,
Buffers are optimized for **I/O operations** in Node.js.

- Buffers allow you to read/write data without converting it to strings.
- They are used extensively in **file handling, network communication, and streams**.

---

## Creating Buffers

### 1. From a string

```js
const buf1 = Buffer.from('Hello Node.js');
console.log(buf1); // <Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>
```

### 2. Allocating fixed size

```js
const buf2 = Buffer.alloc(5);
console.log(buf2); // <Buffer 00 00 00 00 00>
```

### 3. Unsafe allocation (faster, may contain old memory)
```js
const buf3 = Buffer.allocUnsafe(5);
console.log(buf3);
```

## Writing and Reading Data
```js
const buf = Buffer.alloc(10);

// Write a string into buffer
buf.write('abc');
console.log(buf);          // <Buffer 61 62 63 00 00 00 00 00 00 00>
console.log(buf.toString()); // 'abc'

// Read part of buffer
console.log(buf.toString('utf-8', 0, 2)); // 'ab'

```
- Buffer.write(string, offset, length, encoding)

- Buffer.toString(encoding, start, end)
## Buffers and Streams
Streams often produce Buffer chunks, especially for binary data like images or videos.
```js
import fs from 'fs';

const stream = fs.createReadStream('./image.png');

stream.on('data', (chunk) => {
    console.log('Chunk type:', Buffer.isBuffer(chunk)); // true
    console.log('Chunk length:', chunk.length);
});

stream.on('end', () => {
    console.log('Finished reading file');
});

```

## Common Methods
| Method                        | Description                                 | Example                       |
| ----------------------------- | ------------------------------------------- | ----------------------------- |
| `Buffer.from(string)`         | Create buffer from string                   | `Buffer.from('abc')`          |
| `Buffer.alloc(size)`          | Allocate zero-filled buffer                 | `Buffer.alloc(5)`             |
| `Buffer.allocUnsafe(size)`    | Allocate buffer without initializing memory | `Buffer.allocUnsafe(5)`       |
| `buf.write(string)`           | Write string to buffer                      | `buf.write('abc')`            |
| `buf.toString()`              | Convert buffer to string                    | `buf.toString()`              |
| `buf.slice(start, end)`       | Get sub-buffer                              | `buf.slice(0,3)`              |
| `Buffer.concat([buf1, buf2])` | Combine multiple buffers                    | `Buffer.concat([buf1, buf2])` |
| `buf.length`                  | Size of buffer in bytes                     | `buf.length`                  |

## Use Cases
- File I/O: Reading/writing binary files efficiently

- Streams: Handling data chunk-by-chunk in readable/writable streams

- Networking: Processing TCP/UDP packets

- Image/audio/video processing: Low-level manipulation of binary media

- Encoding/decoding: Base64, hex, UTF-8 conversions