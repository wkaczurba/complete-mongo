const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {
    let joe, blogpost, comment;

    beforeEach( (done) => {
        joe = new User({ name: 'Joe' })
        blogPost = new BlogPost( { 
            title: 'JS rules', content: 'JS rules as always. Great news....' })
        comment = new Comment( { content: 'First comment.'} )

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
             .then( () => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne( { name: 'Joe'} )
            //.populate('blogPosts') 
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then( (user) => {
                //console.log('user: ' + user);

                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS rules');
                assert(user.blogPosts[0].content === 'JS rules as always. Great news....');
                assert(user.blogPosts[0].comments[0].content === 'First comment.');
                assert(user.blogPosts[0].comments[0].user._id.toString() === user._id.toString());
            done();
        });
    })
})