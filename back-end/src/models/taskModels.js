// Arquivo responsavel pelas operações no BD
const connection = require('./connection');

// Função getAll, retorna todas as tasks no BD
const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    // esta sendo usado o return, pra caso seja usado em outra função
    return tasks;
};
// Adiciona as tarefas "Cria"
const addTasks = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)'
    const [addTasks] = await connection.execute(query, [title, 'Pendente', dateUTC]);
    return {insertId: addTasks.insertId};
};
// Apaga as tarefas
const deleteTask = async (id) => {
    const removeTak = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removeTak;
};
// Atualiza as tarefas
const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';    
    const { title, status } = task;
    const updateTak = await connection.execute(query, [title, status, id]);
    return updateTak;
};

module.exports = {
    getAll, 
    addTasks,
    deleteTask,
    updateTask
};