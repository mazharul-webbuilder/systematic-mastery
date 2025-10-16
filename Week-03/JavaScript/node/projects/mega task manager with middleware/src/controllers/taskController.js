import Task from "../model/Task.js";

export const getAllTasks = async (req, res) => {
    const tasks = await Task.find().sort({_id: -1})

    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
    });
}

export const createTask = async (req, res) => {
    const {title} = req.body;
    if (!title) {
        const err = new Error('Title is required');
        err.status = 400;
        throw err;
    }
    const task = await Task.create(req.body)

    res.status(201).json({
        success: true,
        data: task,
    });
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
        success: true,
        data: task,
    });
}

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({message: "Task Deleted"})
}