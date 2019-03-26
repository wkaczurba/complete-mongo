const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true })

before( (done) => {
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Warning', error);
        });
})

beforeEach( (done) => {
    const { users, blogposts, comments } = mongoose.connection.collections;

    users.drop( () => { 
        comments.drop( () => {
            blogposts.drop( () => {
                done();
            })
        })
     });

})

