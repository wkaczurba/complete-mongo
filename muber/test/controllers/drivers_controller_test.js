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
})
