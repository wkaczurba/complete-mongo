const express = require('express')
const app = express()
const routes = require('./routes/routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/muber', { useNewUrlParser: true })
}

app.use(bodyParser.json());
routes(app);
app.use( (err, req, res, next) => {
    // THis outputs: 'error: ValidationError: email: Path `email` is required.':
    //console.log('error: ' + err); 

    res.status(422).send({ error: err.message })
})

module.exports = app;
