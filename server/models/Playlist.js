const { default: mongoose } = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();
const setDescription = (description) => _.escape(description).trim();

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
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

PlaylistSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  description: doc.description,
  privacy: doc.privacy,
});

const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistModel;
