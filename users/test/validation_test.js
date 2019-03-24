const assert = require('assert');
const User = require('../src/user')

describe('Validating records', () => {
    it ('requires a user name', (done) => {
        const user = new User({ name : undefined })
        const validationResult = user.validateSync();

        assert(validationResult.errors.name.message === 'Name is required.');
        done();
    });

    it ('name requires more than two characters', (done) => {
        const user = new User( { name : 'AI' })
        const validationResult = user.validateSync();

        //console.log(validationResult.errors.name.message);
        assert (validationResult.errors.name.message === 'Name must be longer than 2 characters.')
        done();
    })

    it ('disallows saving invalid records', (done) => {
        const user = new User( { name : 'AI' })
        user.save()
            .catch( (validationResult) => {
                console.log('validationResult problem: ' + validationResult);
                assert (validationResult.errors.name.message === 'Name must be longer than 2 characters.')
                done();
            })
    })    

});
