import Task from "../model/Task.js";

export const getAllTasks = async (req, res) => {
    const tasks = await Task.find().sort({_id: -1})
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const task = await Task.create(req.body)

    res.status(201).json(task)
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task)
}

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({message: "Task Deleted"})
}