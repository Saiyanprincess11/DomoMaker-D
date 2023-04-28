const mongoose = require('mongoose'); 
const _ = require('underscore'); 

const setSongTitle = (songTitle) => _.escape(songTitle).trim(); 

const SongSchema = new mongoose.Schema({
    songTitle: {
        type: String,
        required: true, 
        trim: true, 
        set: setSongTitle, 
    }, 
    owner: {
        type: mongoose.Schema.ObjectId, 
        required: true,
        ref: 'Account',
    }, 
    createdDate: {
        type: Date, 
        default: Date.now, 
    }, 
});

SongSchema.statics.toAPI = (doc) => ({
    songTitle: doc.songTitle,
});

const SongModel = mongoose.model('Song', SongSchema); 
module.exports = SongModel; 