const mongoose = require('mongoose');
const _ = require('underscore');
const Song = require('./Song.js');

const setTitle = (title) => _.escape(title).trim();
const setDescription = (description) => _.escape(description).trim();
const setPrivacy = (privacy) => _.escape(privacy).trim();

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
  privacy: {
    type: String,
    required: true,
    trim: true,
    set: setPrivacy,
  },
  songs: [
    {
      type: Song.SongSchema,
    },
  ],
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

PlaylistSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  description: doc.description,
  privacy: doc.privacy,
  songs: doc.songs,
});

const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistModel;
