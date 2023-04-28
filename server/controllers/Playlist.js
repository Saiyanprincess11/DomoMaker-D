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

const removePlaylist = async (req, res) => {
  const playListData = {
    title: req.body.title, 
    description: "",
    privacy: "",
    songs: [],
    owner: req.session.account._id,
  };

  try {
    const removePlaylist = new Playlist(playListData); 
    //Finds playlists with 
    const query = {title: `${removePlaylist.title}`};
    const docs = await Playlist.findOneAndRemove(query).select('title description privacy songs').lean().exec();

    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

const getPlaylistID = async (req, res) => {

  //Stores title in an empty playlist
  const playListData = {
    title: req.body.title, 
    description: "",
    privacy: "",
    songs: [],
    owner: req.session.account._id,
  };

  //Searches database by playlist title 
  try {
    const findPlaylist = new Playlist(playListData); 
    //Finds playlists with 
    const query = {title: `${findPlaylist.title}`};
    const docs = await Playlist.find(query).select('title description privacy songs').lean().exec();

    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
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

const makerPage = async (req, res) => res.render('app');

module.exports = {
  makerPage,
  getPlaylists,
  getPlaylistID,
  makePlaylist,
  removePlaylist,
};
