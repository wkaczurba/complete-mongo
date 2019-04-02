const Driver = require('../models/driver')

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there'});
    },
    index(req, res, next) {
        console.log(req.query);
        const { lng, lat } = req.query;

        // Driver.geoNear( {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
        //     {spherical: true, maxDistance: 200000 }
        // )
        //     .then(drivers => res.send(drivers))
        //     .catch(next)

        Driver.aggregate([
            {
                $geoNear: { 
                    near: {type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)]},
                    spherical: true, 
                    distanceField: "dist.calculated",
                    maxDistance: 200000 }
            }
        ], function(err, result) {
            if (err) { 
                next(err)
            } else {
                //console.log(result);
                //res.json(result);
                res.send(result)
            }
        });
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
