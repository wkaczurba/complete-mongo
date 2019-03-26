const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('../src/post')

const UserSchema = new Schema({ 
    name : {
        type: String,
        required: [true, 'Name is required.'],
        validate: {
             validator: (name) => name.length > 2,
             message: 'Name must be longer than 2 characters.'
        }
    }, 
    likes : Number,
    posts : [PostSchema],
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get( function() {
    console.log('Running gettter...');
    return this.posts.length;
})

// Middleware.
// NOTE: Below : this must be a function cannot be a lambda!,
// as lambda will not have this. scope
UserSchema.pre( 'remove', function(next) {
    // get the model of the BlogPost first
    // through Mongoose. using require('BlogPost')
    // to get the model would result in a cyclic
    // dependencies
    const BlogPost = mongoose.model('blogPost');

    //console.log('cleaning up of ' + this)

    // We remove directly from BlogPost schema:
    BlogPost.deleteMany( { _id: { $in: this.blogPosts } })
        .then( () => {
            next();   
        } );
})

const User = mongoose.model('user', UserSchema);
module.exports = User;

