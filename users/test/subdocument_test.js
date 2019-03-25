const assert = require('assert');
const User = require('../src/user');

describe('Testign subdocuments', () => {

    it ('create a subdocument', (done) => {
        const joe = new User({ name: 'Joe',
            posts: [{ title: 'PostTitle'}]
        });

        // It is sufficient to save just Joe object, embedded posts will
        // be also saved:

        joe.save()
            .then( () => User.findOne( { name: 'Joe'} ))
            .then( (user) => { 
                //console.log(user);
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it ('Can add subdocuments to an existing record', (done) => {
        const joe = new User( {
            name: 'Joe', 
            posts: [ 
                { title: 'Python and Me' },
                { title: 'JS Land' },
                { title: 'Crystal Ruby' } ] });
        joe.save()
            .then(() => User.findOne( { name: 'Joe' }))
            .then( (user) => { 
                user.posts.push( { title: 'New Post' })
                return user.save();
            })
            .then( () => User.findOne( { name: 'Joe' }) )
            .then( (user) => {
                //console.log(user.posts);
                assert(user.posts.length === 4);
                assert(user.posts[3].title === 'New Post');
                done();
            });
    });
    
    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [ 
                { title: 'Python and Me' },
                { title: 'JS Land' },
                { title: 'Crystal Ruby' } ] });
        joe.save()
            .then( () => User.findOne({name: 'Joe'}))
            .then( (user) => {
                return user.updateOne( { $pull: { 'posts': { title: 'Crystal Ruby' } }})
                    //.then( (user) => console.log('User after pull:' + user) )
                    //.catch( (x) => console.error(x));
            })
            // This failed:
            // .then((user) => {
            //     const post = user.posts[0];
            //     post.remove(); // This looks like magic!
            //     return user.save();
            //   })            
            .then( () => User.findOne( {name:'Joe'} ))
            .then( (user) => { 
                assert(user.posts.length === 2);
                done();
            });;
    }); 
    
})