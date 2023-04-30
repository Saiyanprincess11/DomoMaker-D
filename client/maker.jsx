const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom');
const axios = require('axios');

/*const GetPlayListByIDForm = (props) => {
    return (
        <form
            action="/getPlaylistID"
            id="getPlaylistIdForm"
            method="POST"
            onSubmit={handlePlaylistID}
        >
          <label htmlFor="getPlaylist">Get Playlist: </label>
          <input id="playlist-id" type="text" name="playlist-id" placeholder="Playlist ID" />
          <input type="submit" value="Get Playlist ID" className="getPlaylistID" />
        </form>
    );
};
const handlePlaylistID = (e) => {
    e.preventDefault();
    const title = e.target.querySelector('#playlist-id').value.trim().toString(); 
    const description = ""; 
    const privacy = ""; 

    if(!title){
        console.log('All fields are required'); 
        return false;
    }

    helper.sendPost(e.target.action, {title, description, privacy}, loadPlaylistFromID); 
    return false;
};
const handleRemovePlaylist = (e) => {
    e.preventDefault();
    const title = e.target.querySelector(".playlist-title").id; 
    const description = ""; 
    const privacy = ""; 

    if(!title){
        console.log('All fields are required'); 
        return false;
    }

    helper.sendPost(e.target.action, {title, description, privacy}, removePlaylist); 
    return false;
};
const ResultList = (props) => {
    if(props.results.length === 0){
        return (
            <div className="resultList">
                <h3 class="resultList-empty">No Playlists Yet!</h3>
            </div>
        ); 
    }
    const resultListNodes = props.results.map(playlist => {
        return(
            <div key={playlist._id} className="playlist">
                <form 
                 action="/removePlaylist"
                 id="removePlaylistForm"
                 method="POST"
                 onSubmit={handleRemovePlaylist}
                >
                    <h3 class="playlist-title" id={playlist.title}>Title: {playlist.title}</h3>
                    <h3 class="playlist-description">Description: {playlist.description}</h3>
                    <h3 class="playlist-privacy">Privacy Setting: {playlist.privacy}</h3>
                    <h3 class="playlist-songs">Songs:{playlist.songs} </h3>
                    <input type='submit' value="X" className="removePlaylist"></input>
                </form>
            </div>
        ); 
    });

    return (
        <div className="resultList">
            {resultListNodes}
        </div>
    );
};*/
/*const removePlaylist = async () => {
    const response = await fetch('/removePlaylist');
    const data = await response.json(); //title to
    ReactDOM.render(
        <ResultList results={data.playlists}/>,
        document.getElementById('results')
    );
    loadPlaylistsFromServer(); 
}; 


const loadPlaylistFromID = async () => {
    const response = await fetch('/getPlaylistID');
    const data = await response.json(); //title to
    ReactDOM.render(
        <ResultList results={data.playlists}/>,
        document.getElementById('results')
    );
}; */
const AddSongToPlaylistForm = (props) => {
    return (
        <form
            action="/addSongToPlaylist"
            id="addSongToPlaylistForm"
            method="POST"
            onSubmit={handleAddSongToPlaylist}
        >
          <label htmlFor="getPlaylist">Get Playlist: </label>
          <input id="playlist-id" type="text" name="song-id" placeholder="Find Playlist" />
          <label htmlFor="getSong">Get Song: </label>
          <input id="song-id" type="text" name="song-id" placeholder="Find Song" />
          <input type="submit" value="Get Song ID" className="getSongID" />
        </form>
    );
};  
const handleAddSongToPlaylist = (e) => {
    e.preventDefault(); 
    const title = e.target.querySelector('#playlist-id').value; 
    const songTitle = e.target.querySelector('#song-id').value; 

    if(!title || !songTitle){
        console.log('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, {title, songTitle}, loadUpdatedPlaylist); 
    return false;
}; 
const loadUpdatedPlaylist = async () => {
    const response = await fetch('/addSongToPlaylist'); 
    const data = await response.json(); 
    ReactDOM.render(
        <PlaylistList playlists = {data.playlists}/>,
        document.getElementById('playlists')
    );
};


const SearchSongForm = (props) => {
    return (
        <form
            action="/getSearchTerm"
            id="getSearchTerm"
            method="POST"
            onSubmit={handleGetSearchTerm}
        >
          <label htmlFor="getSong">Get Song: </label>
          <input id="song-title" type="text" name="song-title" placeholder="Find Song" />
          <input type="submit" value="Get Song ID" className="getSongID" />
        </form>
    );
};

const handleGetSearchTerm = (e) => {
    e.preventDefault(); 
    const searchTerm = e.target.querySelector('#song-title').value; 

    if(!searchTerm){
        console.log('Enter search term'); 
        false; 
    }

    helper.sendPost(e.target.action, {searchTerm}, loadSearchTermFromServer); 
    false; 
}; 

const loadSearchTermFromServer = async () => {
    const response = await fetch('/getSearchTerm'); 
    const data = await response.json(); 
   console.log(data); 
}; 


//Send GET Request to get API
const callAPI = async () => {
    const response = await fetch('/callAPI'); 
    const data = await response.json(); 
   console.log(data);
};



//Song Form 
const handleSong = (e) => {
    e.preventDefault();
    
    const songTitle = e.target.querySelector('#song-title').value; 
    const artist = e.target.querySelector('#song-artist').value; 
    const album = e.target.querySelector('#album-title').value; 
    const duration = e.target.querySelector('#song-duration').value; 
    const imageURL = e.target.querySelector('#song-imageURL').value; 

    if(!songTitle || !artist || !duration || !imageURL){
        console.log('All fields are required'); 
        return false;
    }

    helper.sendPost(e.target.action, {songTitle, artist, album, duration, imageURL}, loadSongsFromServer); 
    return false;
};
const SongForm = (props) => {
    return(
        <form 
            action="/addSong" 
            id="songForm"
            method="POST"
            onSubmit={handleSong}
        >
          <label htmlFor="songTitle">Song Title: </label>
          <input id="song-title" type="text" name="song-title" placeholder="Song Title" />
          <label htmlFor="artist">Artist: </label>
          <input id="song-artist" type="text" name="song-artist" placeholder="Artist" />
          <label htmlFor="albumTitle">Album: </label>
          <input id="album-title" type="text" name="album-title" placeholder="Album" />
          <label htmlFor="songDuration">Duration: </label>
          <input id="song-duration" type="text" name="song-duration" placeholder="Duration" />
          <label htmlFor="songImageURL">Image URL: </label>
          <input id="song-imageURL" type="text" name="song-imageURL" placeholder="Image URL" />
          <input type="submit" value="Make Song" className="makeSong" />
        </form>
    );
};
const SongList = (props) => {
    //No songs added 
    if(props.songs.length === 0){
        return(
            <div className="songList">
                <h3 className="emptySong">No Songs Yet!</h3>
            </div>
        );
    }

    const songNodes = props.songs.map(song => {
        return(
            <div key={song._id} className="song">
                <form 
                 action="/removeSong"
                 id="removeSongForm"
                 method="POST"
                 onSubmit={handleRemoveSong}
                >
                    <h3 class="song-title" id={song.songTitle}>Title: {song.songTitle}</h3>
                    <h3 class="song-artist" id={song.artist}>Artist: {song.artist}</h3>
                    <h3 class="song-album" id ={song.album}>Album: {song.album}</h3>
                    <h3 class="song-duration" id={song.duration}>Duration:{song.duration} </h3>
                    <h3 class="song-imageURL" id={song.imageURL}>Image URL:{song.imageURL} </h3>
                    <input type='submit' value="X" className="removeSong"></input>
                </form>
            </div>
        );
    });

    return(
        <div className="songList">
            {songNodes}
        </div>
    );
};
const loadSongsFromServer = async () => {
    const response = await fetch('/getSongs'); 
    const data = await response.json(); 
    ReactDOM.render(
        <SongList songs = {data.songs} />,
        document.getElementById('songs')
    );
};
const removeSong = async () => {
    const response = await fetch('/removeSong');
    const data = await response.json();
    ReactDOM.render(
        <SongList songs={data.songs}/>,
        document.getElementById('songs')
    );
    loadSongsFromServer();
}; 
const handleRemoveSong = (e) => {
    e.preventDefault();
    
    const songTitle = e.target.querySelector('.song-title').id; 
    const artist = e.target.querySelector('.song-artist').id; 
    const album = e.target.querySelector('.song-album').id; 
    const duration = e.target.querySelector('.song-duration').id; 
    const imageURL = e.target.querySelector('.song-imageURL').id; 

    helper.sendPost(e.target.action, {songTitle, artist, album, duration, imageURL}, removeSong); 
    return false;
}; 


//Playlist Form 
//Gets Playlist Data
const PlaylistForm = (props) => {
    return(
        <form action="/maker" 
        id="playlistForm" 
        className="playlistForm"
        name="playlistForm"
        method="POST"
        onSubmit={handlePlaylist}
        >
          <label htmlFor="name">Name: </label>
          <input id="playlist-title" type="text" name="playlist-title" placeholder="Playlist Title" />
          <label htmlFor="description">Description: </label>
          <input id="playlist-description" type="text" name="playlist-description" placeholder="Description" />
          <label htmlFor="privacy">Privacy Settings: </label>
          <input type="radio" id="private" name="playlist-privacy" value="Private"/>
          <label for="html">Private</label>
          <input type="radio" id="public" name="playlist-privacy" value="Public"/>
          <label for="public">Public</label>
          <input type="submit" value="Make Playlist" className="makePlaylist" />
        </form>
    );
}; 
//Handles Playlist Form Data
const handlePlaylist = (e) => {
    e.preventDefault(); 

    //Form Variables 
    const title = e.target.querySelector('#playlist-title').value; 
    const description = e.target.querySelector('#playlist-description').value; 
    const privacy = e.target.querySelector('input[name=playlist-privacy]:checked').value;

    //Ensures all fields are filled
    if(!title || !description || !privacy){
        helper.handlePlaylistError('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, {title, description, privacy}, loadPlaylistsFromServer); 

    return false; 
};
//handles ist of Playlist Data
const PlaylistList = (props) => {
    if(props.playlists.length === 0){
        return (
            <div className="playlistList">
                <h3 class="playlist-empty">No Playlists Yet!</h3>
            </div>
        ); 
    }

    
    const playlistNodes = props.playlists.map(playlist => {
    
        if(props.playlists.length === 0){
            return (
                <div className="playlistList">
                    <h3 class="playlist-empty">No Song Added Yet!</h3>
                </div>
            ); 
        }

        //Gets song nodes 
        const songNodes = playlist.songs.map(song => {
            return(
                <li>
                    <h3 class="song-title" id={song.songTitle}>Title: {song.songTitle}</h3>
                </li>
            );
        });

        return(
            <div key={playlist._id} className="playlist">
                <form 
                 action="/removePlaylist"
                 id="removePlaylistForm"
                 method="POST"
                 onSubmit={handleRemovePlaylist}
                >
                    <h3 class="playlist-title" id={playlist.title}>Title: {playlist.title}</h3>
                    <h3 class="playlist-description" id={playlist.description}>Description: {playlist.description}</h3>
                    <h3 class="playlist-privacy" id={playlist.privacy}>Privacy Setting: {playlist.privacy}</h3>
                    <h3 class="playlist-songs">Songs:</h3>
                    <ol>
                        {songNodes}
                    </ol>
                    <input type='submit' value="X" className="removePlaylist"></input>
                </form>
            </div>
        ); 
        /* 
         <div class="card has-background-warning playlist my-3" key={playlist._id} style={{width: "40%"}}>
             <header class="card-header has-background-warning">
                 <p class="card-header-title has-background-warning is-size-4">
                     {playlist.title}
                 </p>
                 <button 
                 class="card-header-icon" 
                 onClick={handleButtons(playlist._id)}
                 aria-label="more options" 
                 id="showMorePlaylistBtn">
                     <span class="icon has-background-warning">
                             <i class="fa fa-angle-down has-background-warning has-text-black" aria-hidden="true"></i>
                     </span>
                 </button>

                 <button class="card-header-icon" aria-label="remove playlist" id="removePlaylist">
                         <span class="icon has-background-warning">
                             <i class="fa fa-close has-background-warning has-text-danger" aria-hidden="true"></i>
                         </span>
                 </button>
             </header>
             <div class="card-content" id={playlist._id}>
                 <div class="columns has-background-warning">
                 <div class="column has-background-warning">
                     <div class="content has-background-warning is-size-5 has-text-black">
                     <br/>Description: {playlist.description}
                     <br/>Privacy Setting: {playlist.privacy}
                     <br/>Songs: 
                     <ol class="pl-4 has-background-warning" className='playlist-songs'>
                         
                     </ol>  
                     </div>
                 </div>
                 </div>
                 
             </div>
             <footer class="card-footer has-background-warning is-justify-content-center py-2" id ={playlist._id}>
                     <button id="showLessPlaylistBtn" onClick={helper.hidePlaylistData(playlist._id)} class="is-rounded is-info button">Show Less</button>
             </footer>
         </div>
         */
    });

    return (
        <div className="playlistList">
            {playlistNodes}
        </div>
    );
};
//Fetches playlist data from the server 
const loadPlaylistsFromServer = async () => {
    const response = await fetch('/getPlaylists');
    const data = await response.json(); 

    ReactDOM.render(
        <PlaylistList playlists={data.playlists}/>,
        document.getElementById('playlists')
    );
};
const handleRemovePlaylist = (e) => {
    e.preventDefault();
    const title = e.target.querySelector(".playlist-title").id; 
    const description = e.target.querySelector('.playlist-description').id;  
    const privacy = e.target.querySelector('.playlist-privacy').id;

    if(!title || !description || !privacy){
        helper.handlePlaylistError('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, {title, description, privacy}, removePlaylist); 
    return false;
};
const removePlaylist = async () => {
    const response = await fetch('/removePlaylist');
    const data = await response.json(); //title to
    ReactDOM.render(
        <PlaylistList playlists={data.playlists}/>,
        document.getElementById('playlists')
    );
    loadPlaylistsFromServer(); 
}; 




//--- UI Components ---

//Navigation Bar 
const Navbar = (props) => {
    return (
        <nav class="navbar is-transparent">
            <div class="navbar-brand ">
            <a class="navbar-item" href="/login">
                <span class="icon-text ">
                    <span class="icon">
                    <i class="fa fa-music"></i>
                    </span>
                    <span class="is-size-5 ">WeJam</span>
                </span>
            </a>
            <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
            <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item is-hoverable ">
                    <a id="loginButton" class="navbar-item has-text-white navlink" href="/logout">
                        Logout
                    </a>
                    <a class="navbar-item has-text-white" href="/about">
                    About
                    </a>
        
                    <a class="navbar-item has-text-white" href="/contact">
                    Contact Us
                    </a>
                </div>
            </div>
            </div>
      </nav>
    );
}

//Song Search Bar 
const SearchBar = (props) => {
    return (
        <div class="field">
            <p class="control has-icons-right has-background-black">
                <input class="input is-rounded" type="text" placeholder="Enter a song title"/>
            </p>
        </div>
    );
}

//Renders components on load
const init = () => {
    //Playlist Form 
    ReactDOM.render(
        <PlaylistForm />,
        document.getElementById('makePlaylist') 
    );

    //Song Form 
    ReactDOM.render(
        <SongForm />,
        document.getElementById('addSong')
    ); 

    //Add Song To Playlist
    ReactDOM.render(
        <AddSongToPlaylistForm />,
        document.getElementById('findSong')
    );

    //Search API Form 
    ReactDOM.render(
        <SearchSongForm />,
        document.getElementById('searchSong') 
    );

    //Navbar
    ReactDOM.render(
        <Navbar />,
        document.getElementById('nav') 
    );

    //Search bar
    ReactDOM.render(
        <SearchBar />,
        document.getElementById('searchBar') 
    );

    //Playlist Data
    ReactDOM.render(
        <PlaylistList playlists = {[]} />,
        document.getElementById('playlists') 
    );
    
    //Song Data 
    ReactDOM.render(
        <SongList songs = {[]} />, 
        document.getElementById('songs')
    );
    
    //PlayList Result Found
    /*ReactDOM.render(
        <ResultList results = {[]} />,
        document.getElementById('results') 
    ); */

    //Button Event Listeners 
    document.getElementById('showLessBtn').addEventListener('click', helper.hideData); 
    document.getElementById('showMoreBtn').addEventListener('click', helper.showData); 

    loadPlaylistsFromServer(); 
    loadSongsFromServer();
    //callAPI(); 
}

window.onload = init; 