const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

//Submit button event handling 
const handleLogin = (e) => {
    e.preventDefault(); 
    helper.hideError(); 

    const username = e.target.querySelector('#user').value; 
    const pass = e.target.querySelector('#pass').value; 

    if(!username || !pass) {
        helper.handleError('Username or password is empty!'); 
        return false; 
    }

    helper.sendPost(e.target.action, {username, pass}); 

    return false; 
}

//Signup button handling 
const handleSignup = (e) => {
    e.preventDefault(); 
    helper.hideError(); 

    const username = e.target.querySelector('#user').value; 
    const pass = e.target.querySelector('#pass').value; 
    const pass2 = e.target.querySelector('#pass2').value; 

    if(!username || !pass || !pass2) {
        helper.handleError('All fields are required!'); 
        return false; 
    }

    if(pass !== pass2){
        helper.handleError('Passwords do not match!'); 
        return false; 
    }

    helper.sendPost(e.target.action, {username, pass, pass2}); 
}

//--- React Components ---
//Login Window 
const LoginWindow = (props) => {
    return(
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username:</label>
            <input type="text" id="user" name="username" placeholder="username"/>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="password"/>
            <input type="submit" className="formSubmit" value="Sign in" />
        </form>
    ); 
}; 

//Signup Window
const SignupWindow = (props) => {
    return (
        <form action="/signup" 
        id="signupForm" 
        className="mainForm"
        name="signupForm"
        method="POST"
        onSubmit={handleSignup}
        >
            <label htmlFor="username">Username:</label>
            <input type="text" id="user" name="username" placeholder="username"/>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" name="pass" placeholder="password"/>
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass2" name="pass2" placeholder="retype password"/>
            <input type="submit" className="formSubmit" value="Sign up" />
        </form>
    );
};

//--- Event Handlers ----
const init = () => {
    const loginButton = document.getElementById('loginButton'); 
    const signupButton = document.getElementById('signupButton'); 

    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        ReactDOM.render(<LoginWindow />,
            document.getElementById('content')); 
        return false; 
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        ReactDOM.render(<SignupWindow />,
            document.getElementById('content')); 
        return false; 
    });

    ReactDOM.render(<SignupWindow />,
        document.getElementById('content')); 
};

window.onload = init; 