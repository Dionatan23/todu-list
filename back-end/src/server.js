const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3333;
// Serividor rodando na porta 3333
app.listen(PORT, () => console.log(`Server on port ${PORT}`));