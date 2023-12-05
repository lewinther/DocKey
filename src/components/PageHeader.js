import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

// Stores (has to be first)
import useAuthenticationStore from '../stores/Authentication';

// CSS import
import "../../src/styles.css";

// Components
import UserLogin from "./UserLogIn";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export default function Header(){
	const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
	const doLogout = useAuthenticationStore((state) => state.doLogout);
	return(
		<>
		{isAuthenticated && (
			<h3 onClick={async () => await doLogout()} className="h3-home">Log out</h3>
		  )}
		  {!isAuthenticated && (
			<UserLogin/>
		  )} 
		  </>
		
	);


}