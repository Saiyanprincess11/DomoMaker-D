const { default: mongoose } = require('mongoose');
const _ = require('underscore');
const moment = require('moment-timezone');

// Variables
const setTitle = (title) => _.escape(title).trim();
const setArtist = (artist) => _.escape(artist).trim();
const setAlbum = (album) => _.escape(album).trim();
const setDuration = (duration) => _.escape(duration).trim();

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    set: setArtist,
  },
  album: {
    type: String,
    required: false,
    trim: true,
    set: setAlbum,
  },
  duration: {
    type: Date,
    required: true,
    trim: true,
    set: setDuration,
    default: () => moment().tz('America/New York').format(),
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
  title: doc.title,
  artist: doc.artist,
  album: doc.album,
  duration: doc.duration,
});

const SongModel = mongoose.model('Song', SongSchema);
module.exports = SongModel;
