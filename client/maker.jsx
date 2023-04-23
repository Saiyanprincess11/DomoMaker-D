const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

//Handles domos 
const handleDomo = (e) => {
    e.preventDefault(); 
    helper.hideError(); 

    const name = e.target.querySelector('#domoName').value; 
    const age = e.target.querySelector('#domoAge').value; 
    const skill = e.target.querySelector('#domoSkill').value; 

    if(!name || !age || !skill){
        helper.handlePlaylistError('All fields are required!'); 
        return false; 
    }

    helper.sendPost(e.target.action, {name, age, skill}, loadDomosFromServer); 

    return false; 
}

const handlePlaylist = (e) => {
    e.preventDefault(); 

    const title = e.target.querySelector('#playlist-title').value; 
    const description = e.target.querySelector('#playlist-description').value; 
    const privacy = e.target.querySelector('input[name=playlist-privacy]:checked').value;
    console.log(privacy);
    if(!title || !description || !privacy){
        helper.handleError('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, {title, description, privacy}, loadPlaylistsFromServer ); 

    return false; 
};

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

const PlaylistList = (props) => {
    if(props.playlists.length === 0){
        return (
            <div className="playlistList">
                <h3 class="playlist-empty">No Playlists Yet!</h3>
            </div>
        ); 
    }

    const playlistNodes = props.playlists.map(playlist => {
        return(
            <div key={playlist._id} className="playlist">
                <h3 class="playlist-title">Title: {playlist.title}</h3>
                <h3 class="playlist-description">Description: {playlist.description}</h3>
                <h3 class="playlist-privacy">Privacy Setting: {playlist.privacy}</h3>
            </div>
        ); 
    });

    return (
        <div className="playlistList">
            {playlistNodes}
        </div>
    );
}

const loadPlaylistsFromServer = async () => {
    const response = await fetch('/getPlaylists');
    const data = await response.json(); 
    ReactDOM.render(
        <PlaylistList playlists={data.playlists}/>,
        document.getElementById('playlists')
    );
}

//--- React Components
//Domo Form 
const DomoForm = (props) => {
    return (
        <form action="/maker" 
        id="domoForm" 
        className="domoForm"
        name="domoForm"
        method="POST"
        onSubmit={handleDomo}
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="skill">Skill: </label>
            <input id="domoSkill" type="text" name="skill" placeholder="Domo Skill" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <input type="submit" value="Make Domo" className="makeDomoSubmit" />
        </form>
    ); 

}

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
            <p class="control has-icons-righ has-background-black">
                <input class="input is-rounded" type="text" placeholder="Enter a song title"/>
            </p>
        </div>
    );
}

//Loads list of domos from server 
const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos'); 
    const data = await response.json(); 
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}

//Displays list of Domos
const DomoList = (props) => {
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div className="domo" key={domo._id}>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoSkill">Skill: {domo.skill}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
            </div>
        ); 
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

//Renders components on load
const init = () => {
    ReactDOM.render(
        <DomoForm />,
        document.getElementById('makeDomo') 
    );

    ReactDOM.render(
        <PlaylistForm />,
        document.getElementById('makePlaylist') 
    );

    ReactDOM.render(
        <Navbar />,
        document.getElementById('nav') 
    );

    ReactDOM.render(
        <SearchBar />,
        document.getElementById('searchBar') 
    );

    ReactDOM.render(
        <DomoList domos = {[]} />,
        document.getElementById('domos') 
    );

    ReactDOM.render(
        <PlaylistList playlists = {[]} />,
        document.getElementById('playlists') 
    );

    document.getElementById('showLessBtn').addEventListener('click', helper.hideData); 
    document.getElementById('showMoreBtn').addEventListener('click', helper.showData); 

    loadDomosFromServer(); 
    loadPlaylistsFromServer(); 
}

window.onload = init; 