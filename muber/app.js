const express = require('express')
const app = express()
const routes = require('./routes/routes');

routes(app);
// app.get('/api', (req, res) => {
//     res.send( { hi: 'there' });
// })

module.exports = app;
