const mongoose = require('mongoose')

// Opening DB (once)
before ( done => {
    mongoose.connect('mongodb://127.0.0.1:27017/muber_test');
    mongoose.connection
        .once('open', () => done())
        .once('error', err => {
            console.warn('Warning', error);
        })
})

// Dropping colletion "drivers".
beforeEach(done => {
    const { drivers } = mongoose.connection.collections; 
    drivers.drop()
        .then( () => done () )
        .catch( () => done() );
})
