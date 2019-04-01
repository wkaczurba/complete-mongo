const express = require('express')
const app = express()
const routes = require('./routes/routes');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
routes(app);

module.exports = app;
