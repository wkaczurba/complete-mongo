const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Testing middleware',() => {

    let joe, blogPost;

    // beforeEach: create user + blogPosts in it.
    beforeEach( (done) => {
        joe = new User( { name: 'joe '});
        blogPost = new BlogPost( { title: 'JS is great', content: 'Yes, JS is great' });

        joe.blogPosts.push(blogPost);
        Promise.all( [joe.save(), blogPost.save() ] )
            .then( () => done() );
    });

    // NOTE: joe.remove() will trigger pre-MIDDLEware
    // But users.deleteOne( { name: 'joe' }) will NOT trigget middleware.
    it('users clean up of dangling blogposts on delete', (done) => {
        joe.remove()
            .then( () => BlogPost.countDocuments())
            .then( (count) => {
                assert ( count=== 0 );
                done();
            });
    });

    // This will fail: as we are not calling joe.remove.
    // it.only('This Will fail.', (done) => {
    //     User.deleteOne( { name: 'Joe' })
    //     //joe.remove()
    //         .then( () => BlogPost.countDocuments())
    //         .then( (count) => {
    //             assert ( count=== 0 );
    //             done();
    //         });
    // });


})