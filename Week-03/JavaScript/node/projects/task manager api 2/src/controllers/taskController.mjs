import Task from "../models/Task.mjs";

export const getAllTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}