const models = require('../models');
const fetch = require('node-fetch');
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

const showResults = async (req, res) => {
  const songData = {
    songTitle: req.body.songTitle,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const docs = await Song.find(songData).select('songTitle artist album duration imageURL').lean().exec();
    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving songs' });
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

const getSearch = async (req, res) => {
  if(!req.body.searchTerm){
    return res.status(400).json({ error: 'Search Term required' });
  }

  try{
    
  return res.json({ data: req.body.searchTerm}); 
  }catch(err){
    console.log(err); 
  }
};

const showSearchRes = async (req, res) => {

  //Calls API with search term as parameter 
  const url = `https://shazam.p.rapidapi.com/search?term=${req.body.searchTerm}&locale=en-US&offset=0&limit=1`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '589f295a6fmshba97e09abdb746ap1aad37jsn6062d945de06',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };

  //Returns Search Res JSON 
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.tracks.hits);
  } catch (error) {
    console.error(error);
  }
};


const callAPI = async (req, res) => {
  //Copied from https://rapidapi.com
  /*const url = 'https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '589f295a6fmshba97e09abdb746ap1aad37jsn6062d945de06',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }*/
};
const showAPI = (req, res) => {

}; 

module.exports = {
  makeSong,
  removeSong,
  getSongs,
  getSongID,
  showResults,
  callAPI,
  showAPI,
  getSearch, 
  showSearchRes, 
};
