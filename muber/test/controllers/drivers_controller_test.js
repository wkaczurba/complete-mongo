const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it ('Post to api/driver creates an new driver', done => {
        Driver.countDocuments().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com'})
                .end( () => {
                    Driver.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
            });
        });
    });

    it('PUT to /api/drivers/id edits an existing driver', done => {
        const driver = new Driver( { email: 'newguy@mofm.co', driving: false });
        driver.save()
            .then( () => {
                request(app)
                    .put(`/api/drivers/${driver._id}`)
                    .send({ driving: true })
                    .end( () => {
                        Driver.findOne({ email: 'newguy@mofm.co' })
                            .then( (driver) => {
                                assert(driver.driving === true)
                                done();
                            });
                    });
            });

    });

    it('DELETE /api/drivers/id', done => {

        const driver = new Driver( { email : 'zachary@sugary.sweet' } )

        driver.save()
            .then( () => {
                request(app)
                    .delete(`/api/drivers/${driver._id}`)
                    .end( () => {
                        Driver.findOne({ email : 'zachary@sugary.sweet' })
                        .then( (driver) => { assert (driver === null); 
                            done();
                        })
                    })
            })
    });

    it('GET to /api/drivers finds driver in a location', done => {
        const seattleDriver = new Driver({
            email: 'seattle@testcom',
            geometry: { type: 'Point', coordinates: [-122.47599, 47.6147628]}
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791]}
        });

        Promise.all([ seattleDriver.save(), miamiDriver.save() ])
            .then ( () => {
                console.log('saved');
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end( (err, response) => {
                        assert(response.body.length === 1);
                        done();
                    });
            })
    })
})
