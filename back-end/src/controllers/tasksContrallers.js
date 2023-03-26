const tasksModel = require ('../models/taskModels')

const getAll = async (_req, res) => {
    const tasks = await tasksModel.getAll();
    return res.status(200).json(tasks)
}

const addTasks = async (req,  res) => {
  const addTasks = await tasksModel.addTasks(req.body);
  return res.status(201).json(addTasks)
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await tasksModel.deleteTask(id);
    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    await tasksModel.updateTask(id, req.body) 
    return res.status(204).json()
};

module.exports = {
    getAll,
    addTasks,
    deleteTask,
    updateTask
}