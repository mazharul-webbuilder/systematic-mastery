import express from "express";
import {createTask, deleteTask, getAllTasks, updateTask} from "../controllers/taskController.js";

export const taskRoute = express.Router()

taskRoute.get('/', getAllTasks)
taskRoute.post('/', createTask)
taskRoute.patch('/:id', updateTask)
taskRoute.delete('/:id', deleteTask)