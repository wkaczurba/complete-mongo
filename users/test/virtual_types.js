const assert = require('assert');
const User = require('../src/user');

describe ("Virtual types", () => {

    it ("postCOunt returns number of posts", (done) => {
        const joe = new User({ 
            name : 'Joe', 
            posts: [ 
                { title: 'My title' },
                { title: 'Second title'}
            ]});
        joe.save()
            .then( () => User.findOne({ name: 'Joe'}))
            .then( (user) => {
                assert(user.postCount === 2);
                done();
            })
    });

});
