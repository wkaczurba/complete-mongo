const mongoose = require('mongoose');
const Album = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    webiste: String,
    netWorth: String,
    labelName: String,
    retired: Boolean,
    albums: [Album]
});

const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;
