const mongoose = require('mongoose');
const _ = require('underscore');

// Variables
const setTitle = (title) => _.escape(title).trim();

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
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
});

const SongModel = mongoose.model('Song', SongSchema);
module.exports = SongModel;
