const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
    let joe;

    beforeEach( (done) => {
        joe = new User({name:'Joe'});
        joe.save()
            .then((savedUser) => {
                console.log('saved!: ' + savedUser)
                done();
            });
        
    });

    it('finding user', (done) => {
        User.find( { name: 'Joe' })
            .then( (users) => {
                    console.log('users[0]: ' + users[0]);
                    assert(users[0]._id.toString() === joe._id.toString())
                    done();
                }
            );
    });

})