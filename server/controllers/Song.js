/* Stores song data from API. */
const models = require('../models');

const { Song } = models;

// Creates Song
const makeSong = async (req, res) => {
  // If data is missing
  if (!req.body.title) {
    req.body.title = 'Unknown';
  }
  if (!req.body.artist) {
    req.body.artist = 'Unknown';
  }
  if (!req.body.album) {
    req.body.album = 'Unknown';
  }

  const songData = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
    owner: req.session.account._id,
  };

  try {
    const newSong = new Song(songData);
    newSong.save();
    return res.status(201).json({
      title: newSong.title,
      artist: newSong.artist,
      album: newSong.album,
      duration: newSong.duration,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Song was already added!' });
    }
    return res.status(500).json({ error: 'An error occured while adding song!' });
  }
};

// Renders Pages
const appPage = async (req, res) => res.render('app');
const aboutPage = (req, res) => {
  res.render('about');
};
const contactPage = (req, res) => {
  res.render('contact');
};

// Gets all songs
const getSongs = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Song.find(query).select('title artist album duration').lean().exec();

    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving songs!' });
  }
};

module.exports = {
  appPage,
  aboutPage,
  contactPage,
  makeSong,
  getSongs,
};
