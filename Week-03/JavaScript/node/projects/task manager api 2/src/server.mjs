import express from "express";
import * as path from "node:path";
import {fileURLToPath} from "url";
import * as dotenv from "dotenv";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });


import {connectDB} from "./db/connection.mjs";
import {taskRouter} from "./routers/routes.mjs";


const app = express()
app.use(express.json)
app.use('/tasks', taskRouter);

const PORT = process.env.PORT || 4000;
await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
