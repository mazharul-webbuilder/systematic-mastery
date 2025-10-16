# 🧠 JavaScript Event Loop — The Real Engine Behind Async Magic

JavaScript is **single-threaded**, meaning it can only execute one thing at a time on the main thread.  
But it *feels* asynchronous because of the **event loop** — the boss that decides *what runs next*.

---

## 🏗️ Core Building Blocks

### 1. **Call Stack**
- Where your code runs, line by line.
- When a function is called → it’s pushed to the stack.
- When it returns → it’s popped out.

> If the stack is busy, nothing else runs.

---

### 2. **Heap**
- A big memory store for variables, objects, closures, etc.

---

### 3. **Queue System**
JS has two main queues that the Event Loop manages:

#### 🟣 **Microtask Queue**
- Higher priority.
- Runs right **after** the current stack is empty.
- Includes:
    - `Promise.then()`
    - `await` (resolved promise)
    - `queueMicrotask()`

#### 🟡 **Macrotask Queue**
- Lower priority.
- Runs **after all microtasks** finish.
- Includes:
    - `setTimeout()`
    - `setInterval()`
    - `setImmediate()` (Node.js)
    - I/O callbacks (like fs, http)

---

## 🔁 The Loop Cycle (in short)

1. Execute all code in the **Call Stack** (synchronous).
2. When the stack is empty, execute **all Microtasks** (Promises, awaits).
3. Then execute **one Macrotask** (like a timeout).
4. Repeat forever — this is the **Event Loop**.

---

## ⚡ Example Flow

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
