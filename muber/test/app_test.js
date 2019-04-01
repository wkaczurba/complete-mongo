const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    it('handles a GET request to the /api', (done) => {
        request(app)
            .get('/api') // here goes a type of request.. get put or other.
            .end((err, response) => {
                //console.log(response);
                assert(response.body.hi === 'there');
                done();
            })
    });
})
