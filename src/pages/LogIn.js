import React, { Fragment, useState} from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

// CSS import
import "../../src/styles.css";

// Components

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export const UserLogin = () => {
	const [dockNumber, setDockNumber] = useState('');
	const [password, setPassword] = useState('');
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate()

// Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
// Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;

};

const doUserLogIn = async function () {
	const usernameValue = dockNumber;
	const passwordValue = password;

	try {
		const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
		alert(`Success! User ${loggedInUser.get('dockNumber')} has successfully signed in!`);

		  const currentUser = await Parse.User.current();
		  console.log(loggedInUser === currentUser);
		  setCurrentUser("");
		  setPassword("");
		
		  // Update state variables holding current user
		  getCurrentUser();
		  navigate('/Home');
		  return true; 
		} catch (error){
		    // Error can be caused by wrong parameters or lack of Internet connection
			alert(`Error! ${error.message}`);
			return false;
	}
};

	return(
		<div>
		<div className="login-container">
		  <h1>Log into your account</h1>
		  <div>

		  </div>
		  <div className="textarea">
			<input
			  type="text"
			  placeholder="Dock Number"
			  value={dockNumber}
			  onChange={(e) => setDockNumber(e.target.value)}
			/>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
		  </div>
		</div>
  
		<div className="button-container">
		  <div className="button-group">
		  	<button className="BlueButton" onClick={() => doUserLogIn()}>
  			Log in
			</button>
		  </div>
		</div>
	  </div>
  );
}

export default UserLogin;
