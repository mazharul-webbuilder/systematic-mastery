# Node.js Learning Notes

## 1. Introduction
Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows running JavaScript on the server-side.

- Runs outside the browser
- Non-blocking, event-driven architecture
- Ideal for backend services, APIs, and real-time apps

---

## 2. Running Node.js
- Run a JS file:
```bash
    node filename.js
```
-Run ES Module
```bash
    node filename.mjs
```
- Modules in Node.js (CommonJs)
```js
// bank.js
class BankAccount {
    constructor(owner, balance=0) { this.owner = owner; this.balance = balance }
}
module.exports = { BankAccount }

// app.js
const { BankAccount } = require('./bank')
const acc1 = new BankAccount('Zayaan', 100)

```
- Modules in Node.js (ES Modules)
```js
// bank.mjs
export class BankAccount { ... }

// app.mjs
import { BankAccount } from './bank.mjs'


```
- Classes & Objects
```js
class BankAccount {
    constructor(owner, balance=0) { this.owner = owner; this.balance = balance }
    
    deposit(amount) { this.balance += amount }
    
    withdraw(amount) {
        if(amount > this.balance) return 'Insufficient'
        this.balance -= amount
    }

    getBalance() { return this.balance }
}

```

- Async in Node
```js
function fetchUser() {
    return new Promise(res => setTimeout(() => res({name: 'Zayaan'}), 1000))
}

async function getUser() {
    const user = await fetchUser()
    console.log(user)
}
getUser()

```

## Tips
1. Use console.log() to debug
2. Wrap asynchronous code in async/await
3. Keep modules small & focused
4. Use arrays or objects to simulate in-memory storage
5. ES Modules (.mjs) is preferred for modern JS style
