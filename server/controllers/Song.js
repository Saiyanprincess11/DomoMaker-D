/* Stores song data from API. */
const models = require('../models');

const { Song } = models;

// Creates Song
const makeSong = async (req, res) => {
  // If data is missing
  if (!req.body.title) {
    req.body.title = 'Unknown';
  }

  // Otherwise creates new Song from data
  const songData = {
    title: req.body.title,
    owner: req.session.account._id,
  };

  try {
    const newSong = new Song(songData);
    await newSong.save();
    return res.status(201).json({
      title: newSong.title,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Song was already added!' });
    }
    return res.status(500).json({ error: 'An error occured while adding song!' });
  }
};

// Pages
const aboutPage = (req, res) => { res.render('about'); };
const contactPage = (req, res) => { res.render('contact'); };

// Gets all songs
const getSongs = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Song.find(query).select('title').lean().exec();

    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving songs!' });
  }
};

module.exports = {
  aboutPage,
  contactPage,
  makeSong,
  getSongs,
};
