const models = require('../models');
const { Song } = models;

// Creates new song
const makeSong = async (req, res) => {
  // Makes sure title, artist and duration are required
  if (!req.body.songTitle || !req.body.artist) {
    return res.status(400).json({ error: 'Song Title and Artist are required' });
  }

  if (!req.body.imageURL) {
    req.body.album = 'N/A';
  }

  // Creates new song
  const songData = {
    songTitle: req.body.songTitle,
    artist: req.body.artist,
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const newSong = new Song(songData);
    await newSong.save();
    return res.status(201).json({
      songTitle: newSong.songTitle,
      artist: newSong.artist,
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
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const docs = await Song.findOneAndRemove(songData).select('songTitle artist imageURL').lean().exec();
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
    const docs = await Song.find(songData).select('songTitle artist imageURL').lean().exec();
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
    imageURL: req.body.imageURL,
    owner: req.session.account._id,
  };

  try {
    const docs = await Song.find(songData).select('songTitle artist imageURL').lean().exec();
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
    const docs = await Song.find(query).select('songTitle artist imageURL').lean().exec();

    return res.json({ songs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving playlists' });
  }
};

const getSearch = async (req, res) => {
  if(!req.body.term){
    return res.status(400).json({ error: 'Search Term required' });
  }

  const songData = {
    songTitle: req.body.term, 
    owner: req.session.account._id,
  }; 
  try{
    return res.status(200).json({ term: songData.songTitle}); 
  }catch(err){
    console.log(err); 
    return res.status(500).json({error: 'Cant Add Song'})
  }
};

//Returns Search result of API call
const showSearchRes = async (req, res) => {
  //Holds retrieved data 
  const data = {
    term: req.body.term, 
    limit: 3,
    owner: req.session.account._id,
  };     
  
  const url = `https://shazam.p.rapidapi.com/search?term=${data.term}&locale=en-US&offset=0&limit=${data.limit}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '589f295a6fmshba97e09abdb746ap1aad37jsn6062d945de06',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };

  try {
      //Retrieves API Data
      const response = await fetch(url, options);
      const data = await response.json();
      const results = data.tracks.hits;
      //Push Hits to Song 
      return res.status(200).json({results});
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
};



module.exports = {
  makeSong,
  removeSong,
  getSongs,
  getSongID,
  showResults,
  getSearch, 
  showSearchRes, 
};