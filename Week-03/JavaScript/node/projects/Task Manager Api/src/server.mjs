import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { connectDB } from './db/connect.mjs';
import { taskRouter } from './routes/taskRoute.mjs';

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);

const PORT = process.env.PORT || 4000;
await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
