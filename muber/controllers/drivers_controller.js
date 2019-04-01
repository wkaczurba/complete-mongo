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
    },
    edit(req, res, next) {
        const driverProps = req.body;
        const driverId = req.params.id;
        
        Driver.findOneAndUpdate( { _id: driverId }, driverProps)
            .then( () => Driver.findById( driverId ) )
            .then( (driver) => res.send(driver) )
            .catch(next);
    },
    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndDelete({ _id : driverId })
            .then( (driver) => res.status(204).send(driver))
            .catch(next)
    }
};
