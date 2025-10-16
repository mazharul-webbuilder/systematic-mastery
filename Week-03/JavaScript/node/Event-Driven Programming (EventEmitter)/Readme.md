# Event-Driven Programming in Node.js

This repository demonstrates the **event-driven programming** paradigm in Node.js using the built-in `EventEmitter`
class. Event-driven architecture is a core concept in Node.js, allowing asynchronous, decoupled, and scalable
applications.

---

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Async Event Handling](#async-event-handling)
- [Use Cases](#use-cases)

---

## Introduction

In event-driven programming, **events** trigger specific actions without tightly coupling the code. Node.js uses this
pattern extensively: servers, streams, queues, and even frameworks like NestJS rely on it.

The `EventEmitter` class allows you to:

- Subscribe to events (`on`, `once`)
- Emit events (`emit`)
- Manage asynchronous workflows

---

## Installation

No installation needed for `EventEmitter` — it is built into Node.js.

### Basic Usage

```js
import EventEmitter from 'node:events';

const emitter = new EventEmitter();

// Subscribe to an event
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit the event
emitter.emit('greet', 'Zayaan');

// Output: Hello, Zayaan!

```

- .on() → listens for repeated events

- .once() → listens only once

- .emit() → triggers the event

### Async Event Handling

EventEmitter can work with async functions, but it does not automatically wait for them.

```js
emitter.on('asyncGreet', async (name) => {
    await new Promise(r => setTimeout(r, 500));
    console.log(`Async hello to ${name}`);
});

console.log('Before emit');
emitter.emit('asyncGreet', 'Mazharul');
console.log('After emit');

// Output: 
// Before emit
// After emit
// Async hello to Mazharul

```

### Use Cases

- Task queues (like TaskQueue)

- File watchers (watch folder changes)

- Real-time servers (chat apps, notifications)

- Any system needing decoupled async flows
- queues, file watchers, streams, servers, microservices