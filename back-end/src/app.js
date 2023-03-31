const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router');

// Isso permite a API trabalhar com JSON 
app.use(express.json());
app.use(cors()); // Assim é liberato para todos
app.use(router);

module.exports = app;