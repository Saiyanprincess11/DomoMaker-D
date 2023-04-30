const models = require('../models');

const { Song } = models;

// Creates new song
const makeSong = async (req, res) => {
  // Makes sure title, artist and duration are required
  if (!req.body.songTitle || !req.body.artist || !req.body.duration) {
    return res.status(400).json({ error: 'Song Title, Artist, Duration and Image URL are required' });
  }

  // If song doesn't have an album
  if (!req.body.album) {
    req.body.album = 'N/A';
  }

  if (!req.body.imageURL) {
    req.body.album = 'N/A';
  }

  // Creates new song
  const songData = {
    songTitle: req.body.songTitle,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const newSong = new Song(songData);
    await newSong.save();
    return res.status(201).json({
      songTitle: newSong.songTitle,
      artist: newSong.artist,
      album: newSong.album,
      duration: newSong.duration,
      imageURL: newSong.imageURL,
      owner: req.session.account._id,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Song already exists!' });
    }
    return res.status(500).json({ error: 'Error making song!' });
  }
};

// Removes song from database
const removeSong = async (req, res) => {
  const songData = {
    songTitle: req.body.songTitle,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const docs = await Song.findOneAndRemove(songData).select('songTitle artist album duration imageURL').lean().exec();
    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving songs' });
  }
};

// Gets Song by Title
const getSongID = async (req, res) => {
  if (!req.body.songTitle) {
    return res.status(400).json({ error: 'A song title is required' });
  }
  const songData = {
    songTitle: req.body.songTitle,
    owner: req.session.account._id,
  };

  try {
    const docs = await Song.find(songData).select('songTitle artist album duration imageURL').lean().exec();
    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving song' });
  }
};

// Gets all Songs
const getSongs = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Song.find(query).select('songTitle artist album duration imageURL').lean().exec();

    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

module.exports = {
  makeSong,
  removeSong,
  getSongs,
  getSongID,
};
