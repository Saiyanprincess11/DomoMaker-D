const helper = require('./helper.js'); 
const React = require('react'); 
const ReactDOM = require('react-dom'); 


//Handles domos 
const handleDomo = (e) => {
    e.preventDefault(); 
    helper.hideError(); 

    const name = e.target.querySelector('#domoName').value; 
    const age = e.target.querySelector('#domoAge').value; 

    if(!name || !age){
        helper.handleError('All fields are required!'); 
        return false; 
    }

    helper.sendPost(e.target.action, {name, age}, loadDomosFromServer); 

    return false; 
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
            <input type="text" name="name" placeholder="Domo Name" id="domoName" />
            <label htmlFor="age">Age: </label>
            <input type="number" min="0" name="age" id="domoAge" />
            <input type="submit" value="Make Domo" className="makeDomoSubmit" />
        </form>
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

//Loads list of domos from server 
const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos'); 
    const data = await response.json(); 
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
}

//Renders components on load
const init = () => {
    ReactDOM.render(
        <DomoForm />,
        document.getElementById('makeDomo') 
    );

    ReactDOM.render(
        <DomoList domos = {[]} />,
        document.getElementById('domos') 
    );

    loadDomosFromServer(); 
}

window.onload = init; 