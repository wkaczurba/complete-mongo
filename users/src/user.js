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
    posts : [PostSchema]
});

UserSchema.virtual('postCount').get( function() {
    console.log('Running gettter...');
    return this.posts.length;
})

const User = mongoose.model('user', UserSchema);
module.exports = User;

