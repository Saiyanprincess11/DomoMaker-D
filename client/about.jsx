const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

//React Components 
//About Domo 
const AboutDomo = (props) => {
    return (
        <div class="card">
          <h1>John Doe</h1>
          <p class="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
          <a href="#"><i class="fa fa-dribbble"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-facebook"></i></a>
          <p><button>Contact</button></p>
        </div>
    ); 
}

const init = () => {
    ReactDOM.render(
        <AboutDomo />,
        document.getElementById('about') 
    );
}

window.onload = init; 
