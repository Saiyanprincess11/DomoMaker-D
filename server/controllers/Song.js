const models = require('../models'); 
const Song = models.Song; 

const makeSong = async (req, res) => {
    if(!req.body.songTitle){
        return res.status(400).json({error: 'Song Title is required'}); 
    }

    const songData = {
        songTitle: req.body.songTitle,
        owner: req.session.account._id,
    }; 

    try{
        const newSong = new Song(songData); 
        await newSong.save(); 
        return res.status(201).json({ 
            songTitle: newSong.songTitle, 
        }); 
    }catch(err){
        console.log(err); 
        if(err.code === 11000) {
            return res.status(400).json({ error: 'Song already exists!'}); 
        }
        return res.status(500).json({ error: 'Error making song!'}); 
    }
}; 

const getSongs = async(req, res) => {
    try{
        const query = { owner: req.session.account._id };
        const docs = await Song.find(query).select('songTitle').lean().exec();

        return res.json({songs: docs});
    }catch(err){
        console.log(err); 
        return res.status(500).json({ error: 'Error retrieving playlists' });
    }
}; 

module.exports = {
    makeSong,
    getSongs,
}