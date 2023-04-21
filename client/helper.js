//Displays Error Popup
  const handleError = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message;
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden');
    document.getElementById('user').classList.add('is-danger');
    document.getElementById('pass').classList.add('is-danger');
  };

  const handleSignupError = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message;
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden');
    document.getElementById('user').classList.add('is-danger');
    document.getElementById('pass').classList.add('is-danger');
  };

  //When username is already in use...
  const handleNameError = (message) => {
    document.getElementById('incorrectNameErrMsg').textContent = message;
    document.getElementById('incorrectNameErrMsg').classList.remove('hidden');
    document.getElementById('user').classList.add('is-danger');
  };
  

  //When passwords don't match
  const handleValueError = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message;
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden');
    document.getElementById('pass').classList.add('is-danger');
    document.getElementById('pass2').classList.add('is-danger');
  };

 
  /* Sends post requests to the server using fetch. Will look for various
     entries in the response JSON object, and will handle them appropriately.
  */
  const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(result.error) {
      handleError(result.error);
    }

    if(handler){
        handler(result); 
    }
  };

  //Connects to Music API
 

  //Hides error pop-up
  const hideError = () => {
    document.getElementById('incorrectValsErrMsg').classList.add('hidden'); 
    document.getElementById('pass').classList.remove('is-danger'); 
    document.getElementById('user').classList.remove('is-danger'); 
  }; 

  module.exports = {
    handleError,
    handleSignupError,
    handleNameError,
    handleValueError,
    sendPost, 
    hideError, 
  }