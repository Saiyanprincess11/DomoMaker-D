/* Playlists store the songs a user selects */
const models = require('../models');

const { Playlist } = models; 

// Renders main page
const makerPage = async (req, res) => res.render('app');

/*const aboutPage = (req, res) => {
  res.render('about');
};

const contactPage = (req, res) => {
  res.render('contact');
};*/

// Creates new playlist
const makePlaylist = async (req, res) => {
  // Makes sure useer enters all fields
  if (!req.body.name || !req.body.description || !req.body.privacy) {
    return res.status(400).json({ error: 'A privacy, name, and description are required! ' });
  }

  const playlistData = {
    name: req.body.name,
    description: req.body.description,
    privacy: req.body.privacy,
    owner: req.session.account._id,
  };

  try {
    const newPlaylist = new Playlist(playlistData);
    newPlaylist.save();
    return res.status(201).json({ name: newPlaylist.name, description: newPlaylist.description, privacy: newPlaylist.privacy });
  } catch (err) {
    // console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Playlist already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making playlist!' });
  }
};

// Deletes playlist
/* const deletePlaylist = async (req, res) => {

}; */

// Retrieves all playlists
const getPlaylists = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Playlist.find(query).select('name description privacy').lean().exec();
    return res.json({ playlists: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists!' });
  }
};

// Exports
module.exports = {
  makePlaylist,
  getPlaylists,
  makerPage,
};
