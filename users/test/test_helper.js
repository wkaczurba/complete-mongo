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
    mongoose.connection.collections.users.drop(
        () => {
            done();
        }
    )
})
