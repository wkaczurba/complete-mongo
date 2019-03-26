const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach( (done) => {
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        alex = new User({ name: 'Alex' });
        zach = new User({ name: 'Zach' });
    
        //joe.save()
        //	.then( () => done());
        // NOTE: THis Promise does not guarantee in DB. 
        // It will execute consecutively 
         // but Mongo may save them in different order (e.g internal delays)
        Promise.all( [ joe.save(), maria.save(), alex.save(), zach.save() ])
            .then( () => done());
        
    });

    it('finding user', (done) => {
        User.find( { name: 'Joe' })
            .then( (users) => {
                    //console.log('users[0]: ' + users[0]);
                    assert(users[0]._id.toString() === joe._id.toString())
                    done();
                }
            );
    });

    it('finding a user with a particular id', (done) => {
        User.findOne( { _id:joe._id })
            .then((user) => {
                assert(user.name === 'Joe')
                done();
            });
    })

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort( { name: 1 } ) 	// sort all users by name property: Alex, Joe, Maria, Zachs
            .skip(1)
            .limit(2)
            .then((users) => { 
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
        
})
