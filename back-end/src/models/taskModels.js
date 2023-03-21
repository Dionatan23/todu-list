// Arquivo responsavel pelas operações no BD

const connection = requeri('./connection');

// Função getAll, retorna todas as tasks no BD
const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks');
    // esta sendo usado o return, pra caso seja usado em outra função
    return tasks
};

module.exports = {
    getAll
};