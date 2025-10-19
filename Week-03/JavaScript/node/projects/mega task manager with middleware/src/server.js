import dotenv from 'dotenv'
import express from 'express'
import {connectDB} from "./db/connection.js";
import * as path from "node:path";
import {fileURLToPath} from "url";
import {taskRoute} from "./router/route.js";
import {errorHandler} from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });



// App Build
const app = express()
app.use(express.json())
app.use('/tasks', taskRoute)



// App Run
await connectDB(process.env.MONGO_URI)
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
app.use(errorHandler);

