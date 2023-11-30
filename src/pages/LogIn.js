import React, { Fragment, useState, useEffect } from "react";
import Parse from "parse";
import { useNavigate } from "react-router";



// CSS import
import "../../src/styles.css";

// Components

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


const LogIn = () => {
	const [dockNumber, setDockNumber] = useState("");
	const [password, setPassword] = useState ("");
	const navigate = useNavigate();

	// Validating the credentials, and use Parse to check if the dock no. and password match
	const handleLogin = async () => {
		try{
			const User = Parse.Object.extend("_User");
			const query = new Parse.Query(User);
			query.equalTo("dock", dockNumber);
			const user = await query.first();

			if (user) {
				const storedPassword = user.get("password");
				if (storedPassword === password){
					alert("Login successful!"); // Successful Login here
					navigate("/Home"); // Redirect to the home page
				} else {
					alert("Invalid password");
				}

			} else {
				alert("Dock no. not in use, contact the harbour office!");
			}
		} catch (error) {
			console.error("Error while logging in", error);
			alert("Login failed. Flease try again, or contact the harbour office");
		
		}
	};

	return(
		<Fragment>
		<div className="login-container">
		  <h1>Log into your account</h1>
		  <div>

		  </div>
		  <div className="input-container">
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
		  	<button className="BlueButton" onClick={(e) => { e.preventDefault(); 	handleLogin(); }}>
  			Log in
			</button>
		  </div>
		</div>
	  </Fragment>
	)


}

export default LogIn; 







