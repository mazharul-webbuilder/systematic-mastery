import express from 'express'
import {getAllTasks} from "../controllers/taskController.mjs";

export const taskRouter = express.Router()

taskRouter.get('/', getAllTasks)

