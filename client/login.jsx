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
            <div class="box has-background-warning" style={{width: 600}}>
                <div class="field has-background-warning">
                    <label class="label has-background-warning">Username</label>
                    <div class="control has-icons-left has-icons-right has-background-warning">
                    <input class="input is-rounded" type="text" id="user" name="username" placeholder="Enter your username"/>
                    <span class="icon is-small is-left has-background-warning">
                        <i class="fa fa-user has-background-warning"></i>
                    </span>
                    </div>
                </div>


                <div class="field has-background-warning">
                    <label class="label has-background-warning">Password</label>
                    <div class="control has-icons-left has-icons-right has-background-warning">
                    <input class="input is-rounded" type="password" id="pass" name="pass" placeholder="Create a password"/>
                    <span class="icon is-small is-left has-background-warning">
                        <i class="fa fa-envelope has-background-warning"></i>
                    </span>
                    </div>
                    <p class="help is-danger has-background-warning hidden" id="incorrectValsErrMsg">Username or password is invalid</p>
                </div>

                
                <div class="is-grouped has-background-warning">
                    <div class="control has-background-warning">
                    <button class="button is-link is-rounded">Login</button>
                    </div>
                </div>
            </div>
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
            <div class="box is-align-self-center has-background-warning" style={{width: 600}}>
                <div class="field has-background-warning">
                    <label class="label has-background-warning">Username</label>
                    <div class="control has-icons-left has-icons-right has-background-warning">
                    <input class="input is-rounded" type="text" id="user" name="username" placeholder="Enter your username"/>
                    <span class="icon is-small is-left has-text-dark">
                        <i class="fa fa-user"></i>
                    </span>
                    </div>
                    <p class="help is-danger has-background-warning hidden" id="incorrectNameErrMsg"></p>
                </div>


                <div class="field has-background-warning">
                    <label class="label has-background-warning">Password</label>
                    <div class="control has-icons-left has-icons-right has-background-warning">
                    <input class="input is-rounded" type="password" id="pass" name="pass" placeholder="Create a password"/>
                    <span class="icon is-small is-left has-background-warning">
                        <i class="fa fa-envelope has-background-warning"></i>
                    </span>
                    </div>
                    <p class="help is-danger has-background-warning hidden" id="incorrectValsErrMsg"></p>
                </div>

                <div class="field has-background-warning">
                    <label class="label has-background-warning">Re-enter Password</label>
                    <div class="control has-icons-left has-icons-right has-background-warning">
                    <input class="input is-rounded" type="password" id="pass2" name="pass2" placeholder="Re-enter your password"/>
                    <span class="icon is-small is-left has-background-warning">
                        <i class="fa fa-envelope has-background-warning"></i>
                    </span>
                    </div>
                    <p class="help is-danger has-background-warning hidden" id="incorrectValsErrMsg"></p>
                </div>

                
                <div class="is-grouped has-background-warning">
                    <div class="control has-background-warning">
                    <button class="button is-link is-rounded">Sign Up</button>
                    </div>
                </div>
            </div>
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

         

    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        ReactDOM.render(<SignupWindow />,
            document.getElementById('content')); 
        return false; 
    });

    ReactDOM.render(<LoginWindow />,
        document.getElementById('content')); 

};

window.onload = init; 