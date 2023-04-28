const models = require('../models');

const { Playlist } = models;

const makePlaylist = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.privacy) {
    return res.status(400).json({ error: 'A title, privacy setting and description are required' });
  }

  const playlistData = {
    title: req.body.title,
    description: req.body.description,
    privacy: req.body.privacy,
    songs: [],
    owner: req.session.account._id,
  };

  try {
    const newPlaylist = new Playlist(playlistData);
    await newPlaylist.save();
    return res.status(201).json({
      title: newPlaylist.title,
      description: newPlaylist.description,
      privacy: newPlaylist.privacy,
      songs: newPlaylist.songs,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Playlist already exists' });
    }
    return res.status(500).json({ error: 'An error occured making the playlist' });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Playlist.find(query).select('title description privacy songs').lean().exec();

    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

// Removes Playlist from Collection
const removePlaylist = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Playlist.findByIdAndDelete(query).select('title description privacy songs').lean().exec();
    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting playlists' });
  }
};

const makerPage = async (req, res) => res.render('app');

module.exports = {
  makerPage,
  getPlaylists,
  makePlaylist,
  removePlaylist,
};
