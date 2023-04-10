const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

//React Components 
//About Domo 
const AboutDomo = (props) => {
    return (
        <div>
            <h3>Coming Soon To You!</h3>
        </div>

    ); 
}

const init = () => {
    ReactDOM.render(
        <AboutDomo />,
        document.getElementById('makeDomo') 
    );
}

window.onload = init; 
