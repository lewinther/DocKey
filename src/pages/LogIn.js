import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

// Components
import DockFilter from "../components/DockFilter";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function LogIn(){


	return(
		<Fragment>
			<div className="login-container" >
				<h1>Log into your account</h1>
			</div>
			<div>
				<DockFilter
        			onDockSelect={handleDockSelection}
       				 dockNumbers={dockNumbers}
      			/>
			</div>

		</Fragment>
	)

}
