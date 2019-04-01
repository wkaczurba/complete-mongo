const express = require('express')
const app = express()
const routes = require('./routes/routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/muber', { useNewUrlParser: true })

app.use(bodyParser.json());
routes(app);

module.exports = app;
