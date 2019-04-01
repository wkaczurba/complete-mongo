const Driver = require('../models/driver')

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there'});
    },
    create(req, res, next) {
        console.log(req.body); // body will be parsed by bodyParser

        const driverProps = req.body;

        // Save to the database:
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next)
    }
};
