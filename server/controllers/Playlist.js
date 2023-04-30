const models = require('../models');

const { Playlist } = models;
const { Song } = models;

// Creates new playlist
const makePlaylist = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.privacy) {
    return res.status(400).json({ error: 'A title, privacy setting and description are required' });
  }

  const playlistData = {
    title: req.body.title,
    description: req.body.description,
    privacy: req.body.privacy,
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

// Removes playlist from database
const removePlaylist = async (req, res) => {
  const playListData = {
    title: req.body.title,
    description: req.body.description,
    privacy: req.body.privacy,
    owner: req.session.account._id,
  };

  try {
    // Finds playlists with
    const docs = await Playlist.findOneAndRemove(playListData).select('title description privacy songs').lean().exec();

    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

// Retrieves playlist by title
const getPlaylistID = async (req, res) => {
  // Stores title in an empty playlist
  const playListData = {
    title: req.body.title,
    owner: req.session.account._id,
  };

  try {
    // Searches db for playlist
    const docs = await Playlist.find(playListData).select('title description privacy songs').lean().exec();
    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

// Returns all playlists
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

// Adds Song to Playlist
const addSongtoPlaylist = async (req, res) => {
  // Data validation
  if (!req.body.title || !req.body.songTitle) {
    return res.status(400).json({ error: 'A song and playlist title are required' });
  }

  const playlistData = {
    title: req.body.title,
    owner: req.session.account._id,
  };

  const songData = {
    songTitle: req.body.songTitle,
    owner: req.session.account._id,
  };

  try {
    // Finds song
    const song = await Song.find(songData);

    // Finds playlist
    const playlist = await Playlist.find(playlistData).updateOne(
      // Pushes song to songs array
      { $push: { songs: song } },
    );

    // Adds song to playlists' song array
    return res.json({ playlists: playlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding song' });
  }
};

// Retrieves search result from API

// Calls Music API

// Pages
const makerPage = async (req, res) => res.render('app');

module.exports = {
  makerPage,
  getPlaylists,
  getPlaylistID,
  makePlaylist,
  removePlaylist,
  addSongtoPlaylist,
};
