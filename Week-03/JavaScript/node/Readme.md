# Complete Node.js Learning Guide

## Table of Contents
1. [Introduction](#1-introduction)
2. [Installation & Setup](#2-installation--setup)
3. [Running Node.js](#3-running-nodejs)
4. [Core Concepts](#4-core-concepts)
5. [Modules System](#5-modules-system)
6. [Built-in Modules](#6-built-in-modules)
7. [NPM - Package Manager](#7-npm---package-manager)
8. [Asynchronous Programming](#8-asynchronous-programming)
9. [File System Operations](#9-file-system-operations)
10. [HTTP & Web Servers](#10-http--web-servers)
11. [Express.js Framework](#11-expressjs-framework)
12. [Working with APIs](#12-working-with-apis)
13. [Database Integration](#13-database-integration)
14. [Error Handling](#14-error-handling)
15. [Environment Variables](#15-environment-variables)
16. [Debugging & Testing](#16-debugging--testing)
17. [Best Practices](#17-best-practices)

---

##  Introduction

Node.js is not a language or a framework — it’s a runtime environment that lets JavaScript run outside the browser, powered by the V8 engine (the same one Chrome uses).
- Access files, network, databases, etc
- Run Background apps, CLIs, scripts, and servers -- al with js
- Think of Node.js as C++ + V8 + event loop + async I/O magic

### Nodes Core Architecture
- Call Stack: executes js code (just like browser)
- Event Loop: manages async tasks and callbacks
- Thread Pool (libuv): handles heavy I/O tasks (file read/write, network, DNS, etc)
- Callback Queue / Microtask Queue: same async pattern as browser

### Key Features
- **Non-blocking I/O**: Handles multiple operations without waiting
- **Event-driven architecture**: Responds to events efficiently
- **Single-threaded**: Uses event loop for concurrency
- **Cross-platform**: Runs on Windows, macOS, Linux
- **Large ecosystem**: NPM has 2+ million packages

### Use Cases
- REST APIs and microservices
- Real-time applications (chat, notifications)
- Streaming applications
- Command-line tools
- Server-side rendering (SSR)
- Backend for web/mobile apps




## Core Concepts

### The Event Loop
Node.js uses an event loop to handle asynchronous operations:

```js
console.log('1. Start')

setTimeout(() => {
    console.log('2. Timeout callback')
}, 0)

Promise.resolve().then(() => {
    console.log('3. Promise callback')
})

console.log('4. End')

// Output: 1, 4, 3, 2
```

### Global Objects
```js
// Available everywhere without import
console.log(__dirname)    // Current directory path
console.log(__filename)   // Current file path
console.log(process.env)  // Environment variables
console.log(process.argv) // Command line arguments
```

### Process Object
```js
// Process information
console.log(process.version)      // Node version
console.log(process.platform)     // OS platform
console.log(process.cwd())        // Current working directory

// Exit process
process.exit(0) // Success
process.exit(1) // Error
```

---

## Modules System

### CommonJS (Traditional)
```js
// math.js - Export
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

module.exports = { add, subtract }

// Or export individually
exports.multiply = (a, b) => a * b

// app.js - Import
const { add, subtract } = require('./math')
const math = require('./math') // Import all

console.log(add(5, 3))      // 8
console.log(math.subtract(5, 3))  // 2
```

### ES Modules (Modern - Recommended)
```js
// math.mjs - Named exports
export function add(a, b) {
    return a + b
}

export function subtract(a, b) {
    return a - b
}

// Default export
export default class Calculator {
    add(a, b) { return a + b }
}

// app.mjs - Import
import { add, subtract } from './math.mjs'
import Calculator from './math.mjs'

console.log(add(5, 3))  // 8
```

### Enable ES Modules in package.json
```json
{
  "type": "module"
}
```

### Classes & Objects
```js
class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner
        this.balance = balance
    }
    
    deposit(amount) {
        this.balance += amount
        return this.balance
    }
    
    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error('Insufficient funds')
        }
        this.balance -= amount
        return this.balance
    }

    getBalance() {
        return this.balance
    }
}

const account = new BankAccount('Zayaan', 100)
account.deposit(50)
console.log(account.getBalance()) // 150
```

---

##  Built-in Modules

### Path Module
```js
const path = require('path')

console.log(path.join('/users', 'zayaan', 'file.txt'))
// Output: /users/zayaan/file.txt

console.log(path.basename('/users/zayaan/file.txt'))  // file.txt
console.log(path.dirname('/users/zayaan/file.txt'))   // /users/zayaan
console.log(path.extname('/users/zayaan/file.txt'))   // .txt
```

### OS Module
```js
const os = require('os')

console.log(os.platform())     // OS platform
console.log(os.arch())         // CPU architecture
console.log(os.cpus())         // CPU info
console.log(os.freemem())      // Free memory
console.log(os.totalmem())     // Total memory
console.log(os.homedir())      // Home directory
```

### URL Module
```js
const url = require('url')

const myUrl = new URL('https://example.com:8080/path?name=Zayaan&age=25#section')

console.log(myUrl.hostname)    // example.com
console.log(myUrl.pathname)    // /path
console.log(myUrl.search)      // ?name=Zayaan&age=25
console.log(myUrl.searchParams.get('name'))  // Zayaan
```

### Events Module
```js
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

// Listen to event
myEmitter.on('event', (data) => {
    console.log('Event fired!', data)
})

// Emit event
myEmitter.emit('event', { name: 'Zayaan' })
```

---

## NPM - Package Manager

### Basic Commands
```bash
# Initialize project
npm init
npm init -y  # Skip questions

# Install packages
npm install express           # Production dependency
npm install -D nodemon       # Dev dependency
npm install express@4.17.1   # Specific version

# Uninstall packages
npm uninstall express

# Update packages
npm update
npm outdated  # Check outdated packages

# Global packages
npm install -g nodemon
npm uninstall -g nodemon
```

### package.json
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
```

### Useful Packages
```bash
npm install express          # Web framework
npm install mongoose         # MongoDB ODM
npm install dotenv          # Environment variables
npm install cors            # CORS middleware
npm install jsonwebtoken    # JWT authentication
npm install bcrypt          # Password hashing
npm install axios           # HTTP client
npm install -D nodemon      # Auto-restart server
```

---

##  Asynchronous Programming

### Callbacks
```js
function fetchUser(id, callback) {
    setTimeout(() => {
        callback(null, { id, name: 'Zayaan' })
    }, 1000)
}

fetchUser(1, (error, user) => {
    if (error) {
        console.error(error)
    } else {
        console.log(user)
    }
})
```

### Promises
```js
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: 'Zayaan' })
            } else {
                reject(new Error('Invalid ID'))
            }
        }, 1000)
    })
}

fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error))
```

### Async/Await (Recommended)
```js
async function getUser() {
    try {
        const user = await fetchUser(1)
        console.log(user)
    } catch (error) {
        console.error(error)
    }
}

getUser()

// Multiple promises
async function getAllData() {
    const [users, posts] = await Promise.all([
        fetchUsers(),
        fetchPosts()
    ])
    return { users, posts }
}
```

---

##  File System Operations

### Reading Files
```js
const fs = require('fs')
const fsPromises = require('fs').promises

// Synchronous (blocks code)
const data = fs.readFileSync('file.txt', 'utf8')
console.log(data)

// Asynchronous (callback)
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

// Promises (recommended)
async function readFile() {
    try {
        const data = await fsPromises.readFile('file.txt', 'utf8')
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}
```

### Writing Files
```js
// Overwrite file
await fsPromises.writeFile('file.txt', 'Hello World')

// Append to file
await fsPromises.appendFile('file.txt', '\nNew line')

// Create directory
await fsPromises.mkdir('newFolder', { recursive: true })

// Delete file
await fsPromises.unlink('file.txt')

// Delete directory
await fsPromises.rmdir('folder')
```

### File Info
```js
const stats = await fsPromises.stat('file.txt')

console.log(stats.isFile())         // true
console.log(stats.isDirectory())    // false
console.log(stats.size)             // Size in bytes
```

---

##  HTTP & Web Servers

### Basic HTTP Server
```js
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Hello World</h1>')
    res.end()
})

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
```

### Routing
```js
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Home Page')
    } else if (req.url === '/about') {
        res.write('About Page')
    } else {
        res.writeHead(404)
        res.write('Not Found')
    }
    res.end()
})
```

### Serving JSON
```js
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ name: 'Zayaan', age: 25 }))
})
```

---

##  Express.js Framework

### Setup
```bash
npm install express
```

### Basic Server
```js
const express = require('express')
const app = express()

// Middleware
app.use(express.json())  // Parse JSON
app.use(express.urlencoded({ extended: true }))  // Parse form data

// Routes
app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'Zayaan' }])
})

app.post('/api/users', (req, res) => {
    const user = req.body
    res.status(201).json(user)
})

app.listen(3000, () => {
    console.log('Server on port 3000')
})
```

### Route Parameters
```js
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    res.json({ id, name: 'Zayaan' })
})

// Query parameters: /api/search?name=Zayaan&age=25
app.get('/api/search', (req, res) => {
    const { name, age } = req.query
    res.json({ name, age })
})
```

### Middleware
```js
// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()  // Pass to next middleware
}

app.use(logger)

// Auth middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    next()
}

app.get('/api/protected', auth, (req, res) => {
    res.json({ message: 'Protected data' })
})
```

### Static Files
```js
// Serve static files from 'public' folder
app.use(express.static('public'))

// Now you can access: http://localhost:3000/index.html
```

### Router
```js
// routes/users.js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ users: [] })
})

router.post('/', (req, res) => {
    res.status(201).json(req.body)
})

module.exports = router

// app.js
const userRouter = require('./routes/users')
app.use('/api/users', userRouter)
```

---

##  Working with APIs

### Making HTTP Requests
```js
const https = require('https')

// Native HTTPS module
https.get('https://api.github.com/users/github', (res) => {
    let data = ''
    
    res.on('data', chunk => {
        data += chunk
    })
    
    res.on('end', () => {
        console.log(JSON.parse(data))
    })
})

// Using axios (recommended)
const axios = require('axios')

async function fetchData() {
    try {
        const response = await axios.get('https://api.github.com/users/github')
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}
```

### Creating REST API
```js
let users = [
    { id: 1, name: 'Zayaan', email: 'zayaan@email.com' }
]

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users)
})

// GET single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
})

// POST create user
app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    users.push(user)
    res.status(201).json(user)
})

// PUT update user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ error: 'User not found' })
    
    user.name = req.body.name
    user.email = req.body.email
    res.json(user)
})

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ error: 'User not found' })
    
    users.splice(index, 1)
    res.status(204).send()
})
```

---

##  Database Integration

### MongoDB with Mongoose
```bash
npm install mongoose
```

```js
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB error:', err))

// Define Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now }
})

// Create Model
const User = mongoose.model('User', userSchema)

// CRUD Operations
async function createUser() {
    const user = new User({
        name: 'Zayaan',
        email: 'zayaan@email.com',
        age: 25
    })
    await user.save()
    console.log('User created')
}

async function getUsers() {
    const users = await User.find()
    console.log(users)
}

async function getUserById(id) {
    const user = await User.findById(id)
    console.log(user)
}

async function updateUser(id) {
    const user = await User.findByIdAndUpdate(
        id,
        { age: 26 },
        { new: true }  // Return updated document
    )
    console.log(user)
}

async function deleteUser(id) {
    await User.findByIdAndDelete(id)
    console.log('User deleted')
}
```

### PostgreSQL with pg
```bash
npm install pg
```

```js
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'myapp',
    password: 'password',
    port: 5432
})

async function getUsers() {
    const result = await pool.query('SELECT * FROM users')
    console.log(result.rows)
}

async function createUser(name, email) {
    const query = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
    const result = await pool.query(query, [name, email])
    return result.rows[0]
}
```

---

##  Error Handling

### Try-Catch
```js
async function fetchData() {
    try {
        const data = await someAsyncOperation()
        return data
    } catch (error) {
        console.error('Error:', error.message)
        throw error
    }
}
```

### Express Error Handling
```js
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    })
})

// Custom Error Class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

app.get('/api/error', (req, res, next) => {
    next(new AppError('Something went wrong', 400))
})
```

### Unhandled Rejections
```js
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason)
    process.exit(1)
})

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    process.exit(1)
})
```

---

## Environment Variables

### Using dotenv
```bash
npm install dotenv
```

Create `.env` file:
```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
NODE_ENV=development
```

Load in app:
```js
require('dotenv').config()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DATABASE_URL

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
```

### .gitignore
```
node_modules/
.env
.env.local
*.log
dist/
build/
```

---

## Debugging & Testing

### Debugging
```bash
# Run with inspector
node --inspect index.js

# Debug in VS Code
# Add to launch.json:
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${workspaceFolder}/index.js"
}
```

### Using Nodemon
```bash
npm install -D nodemon

# package.json
"scripts": {
  "dev": "nodemon index.js"
}

# Run
npm run dev
```

### Testing with Jest
```bash
npm install -D jest
```

```js
// math.js
function add(a, b) {
    return a + b
}
module.exports = { add }

// math.test.js
const { add } = require('./math')

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
})

// package.json
"scripts": {
  "test": "jest"
}
```

---

##  Best Practices

### Project Structure
```
my-app/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Code Best Practices
1. **Use async/await** instead of callbacks
2. **Handle errors** properly with try-catch
3. **Use environment variables** for config
4. **Keep functions small** and focused
5. **Use ES6+ features**: destructuring, arrow functions, template literals
6. **Validate input** before processing
7. **Use proper HTTP status codes**
8. **Log important events**
9. **Write tests** for critical functionality
10. **Use linting tools**: ESLint

### Security
```bash
npm install helmet cors express-rate-limit

# app.js
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

app.use(helmet())  // Security headers
app.use(cors())    // Enable CORS

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100  // Limit each IP to 100 requests per windowMs
})
app.use(limiter)
```

### Performance
1. Use **caching** (Redis)
2. **Compress responses**: `npm install compression`
3. Use **database indexing**
4. **Cluster mode** for multi-core systems
5. **Monitor memory usage**
6. Use **async operations** for I/O

---

## Quick Reference

### Common Commands
```bash
node file.js              # Run file
npm init -y               # Initialize project
npm install package       # Install package
npm start                 # Run start script
npm test                  # Run tests
npm run dev               # Run dev script
```

### Common Imports
```js
const fs = require('fs')
const path = require('path')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
```

### Debugging Tips
1. Use `console.log()` liberally
2. Check `package.json` for correct scripts
3. Verify environment variables
4. Check error stack traces
5. Use `node --trace-warnings` for warnings



**Happy Coding! 🚀**