const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

//React Components 
//About Domo 
const LoginWindow = (props) => {
    return(
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Usernamers:</label>
            <input type="text" id="user" name="username" placeholder="username"/>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="password"/>
            <input type="submit" className="formSubmit" value="Sign in" />
        </form>
    ); 
}; 

const init = () => {
    ReactDOM.render(
        <LoginWindow />,
        document.getElementById('makeDomo') 
    );
}

window.onload = init; 
