import express from "express";
import {createTask, deleteTask, getAllTasks, updateTask} from "../controllers/taskController.js";
import {asyncHandler} from "../middleware/errorHandler.js";

export const taskRoute = express.Router()

taskRoute.get('/', asyncHandler(getAllTasks))
taskRoute.post('/', asyncHandler(createTask))
taskRoute.patch('/:id', asyncHandler(updateTask))
taskRoute.delete('/:id', asyncHandler(deleteTask))