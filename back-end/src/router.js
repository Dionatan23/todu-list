const express = require('express');
const tasksControlers = require('./controllers/tasksContrallers')
const taskMDD = require('./middlewares/tasksMDD')

const router = express.Router();

router.get('/tasks', tasksControlers.getAll);
router.post('/tasks', taskMDD.validateTitle, tasksControlers.addTasks);
router.delete('/tasks/:id', tasksControlers.deleteTask);
router.put('/tasks/:id', taskMDD.validateTitle, taskMDD.validateStatus, tasksControlers.updateTask);


module.exports = router;