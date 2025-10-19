# 🧩 Task Manager API — Node.js + Express + MongoDB

A simple, production-style REST API built with **Express**, **Mongoose**, and **ES Modules**, designed to teach you the real-world Node.js backend fundamentals — from routing to async error handling.

---

## 🚀 Overview

This API is a backend-only project that manages **tasks** (like a to-do system).  
Each task has:
- `title` — short name for the task
- `completed` — boolean flag
- (and timestamps automatically managed by Mongoose)

The project demonstrates:
- Express routing & controllers
- MongoDB integration with Mongoose
- Modular folder structure
- Async/await with error handling
- Environment variables (`dotenv`)
- Middleware (custom error handler, JSON parser)

---

## 📁 Folder Structure

```
src/
├── controllers/
│   └── taskController.mjs     # Logic for each route (CRUD)
├── db/
│   └── connect.mjs            # MongoDB connection helper
├── middleware/
│   └── errorHandler.mjs       # Centralized error middleware
├── models/
│   └── Task.mjs               # Mongoose schema & model
├── routes/
│   └── taskRoute.mjs          # Route definitions
├── server.mjs                 # App entry point
.env                           # Environment config
```

---

## ⚙️ Setup

### 1️⃣ Install dependencies
```bash
  npm install express mongoose dotenv
```

### 2️⃣ Create `.env` file at project root
```env
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
PORT=4000
```

### 3️⃣ Run the server
```bash
  node src/server.mjs
```

---

## 🧠 How It Works

### 1. Entry Point — `server.mjs`
```javascript
import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/connect.mjs';
import { taskRouter } from './routes/taskRoute.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

**Explanation:**
- Loads environment variables using dotenv.
- Connects to MongoDB via `connectDB`.
- Registers routes and the global error handler.
- Starts the Express server.

---

### 2. Database Connection — `connect.mjs`
```javascript
import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('DB connection Failed', err);
  }
};
```

**Explanation:**
- Uses Mongoose's `connect()` to establish a database link.
- Catches and logs connection errors.

---

### 3. Model — `Task.mjs`
```javascript
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
```

**Explanation:**
- Defines the schema (structure) for tasks.
- Automatically adds `createdAt` and `updatedAt` fields.

---

### 4. Controller — `taskController.mjs`
```javascript
import Task from '../models/Task.mjs';

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    const err = new Error('Title is required');
    err.status = 400;
    throw err;
  }
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, data: task });
};
```

**Explanation:**
- Contains business logic (data fetching, validation, etc.).
- Throws errors instead of manually sending failure responses — handled by middleware.

---

### 5. Routes — `taskRoute.mjs`
```javascript
import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.mjs';
import { getAllTasks, createTask } from '../controllers/taskController.mjs';

export const taskRouter = express.Router();
taskRouter.get('/', asyncHandler(getAllTasks));
taskRouter.post('/', asyncHandler(createTask));
```

**Explanation:**
- Uses `asyncHandler()` wrapper to catch errors in async functions.
- Defines route → controller mapping.

---

### 6. Middleware — `errorHandler.mjs`
```javascript
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

**Explanation:**
- `errorHandler`: centralizes error responses.
- `asyncHandler`: wraps async route functions so thrown errors bubble to the handler.

---

## 📬 API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | `/tasks`      | Fetch all tasks          |
| POST   | `/tasks`      | Create a new task        |
| GET    | `/tasks/:id`  | Get a specific task      |
| PATCH  | `/tasks/:id`  | Update task fields       |
| DELETE | `/tasks/:id`  | Delete a task            |

### Example Request:
```bash
  POST /tasks
Content-Type: application/json

{
  "title": "Learn Node.js"
}
```

### Example Response:
```json
{
  "success": true,
  "data": {
    "_id": "67142c145cfe289b4b7d12f3",
    "title": "Learn Node.js",
    "completed": false,
    "createdAt": "2025-10-15T06:22:12.648Z",
    "updatedAt": "2025-10-15T06:22:12.648Z"
  }
}
```

---

## 🧩 Key Concepts You Learned

| Concept                | Description                                      |
|------------------------|--------------------------------------------------|
| Express Router         | Modular routing for clean code.                  |
| Async/Await            | Non-blocking DB operations.                      |
| Middleware             | Centralized logic (JSON parsing, errors).        |
| Mongoose Models        | Object data modeling (ODM) for MongoDB.          |
| Environment Variables  | Keep secrets and config separate.                |
| Error Handling         | Catch async errors globally (like Laravel exceptions). |

---

## 🧠 Next Steps

- Add pagination and query filters for `GET /tasks`.
- Add a logger middleware for API request tracking.
- Implement JWT authentication for protected routes.
- Transition this project to TypeScript.
- Rebuild it in NestJS to learn enterprise structure.

---

## 💡 Author Notes

This project is part of the **JS Mastery Journey** —  
focused on learning backend development through small, structured Node projects before moving to TypeScript and NestJS.

---

## 🧰 Tech Stack

- Node.js (ESM)
- Express.js
- MongoDB
- Mongoose
- Dotenv

---

## 📝 License

This project is open source and available for educational purposes.