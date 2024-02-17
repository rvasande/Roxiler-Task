const express = require('express');
const productRoute = require('./routes/productRoute')

const app = express();

app.use('/api/v1/products',productRoute)

module.exports = app;