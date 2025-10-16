import express from "express";
import {createTask, deleteTask, getAllTasks, updateTask} from '../controllers/taskController.mjs';

export const taskRouter = express.Router()
taskRouter.get('/', getAllTasks)
taskRouter.post('/', createTask)
taskRouter.patch('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)