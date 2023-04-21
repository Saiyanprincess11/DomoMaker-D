const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 

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