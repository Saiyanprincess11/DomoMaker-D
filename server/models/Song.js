const mongoose = require('mongoose');
const _ = require('underscore');

const setSongTitle = (songTitle) => _.escape(songTitle).trim();
const setArtist = (artist) => _.escape(artist).trim();
const setAlbum = (album) => _.escape(album).trim();
const setDuration = (duration) => _.escape(duration).trim();
const setImageURL = (imageURL) => _.escape(imageURL).trim();

const SongSchema = new mongoose.Schema({
  songTitle: {
    type: String,
    required: true,
    trim: true,
    set: setSongTitle,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    set: setArtist,
  },
  imageURL: {
    type: String,
    required: false,
    trim: true,
    set: setImageURL,
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
  artist: doc.artist,
  imageURL: doc.imageURL,
});

const SongModel = mongoose.model('Song', SongSchema);
module.exports = SongModel;
module.exports.SongSchema = SongSchema;
