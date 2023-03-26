const express = require('express');
const app = express();

const router = require('./router');

// Isso permite a API trabalhar com JSON 
app.use(express.json());

app.use(router);

module.exports = app;