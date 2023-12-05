import React, { Fragment, useEffect, useState} from "react";

// Stores (has to be first)
import useAuthenticationStore from '../stores/Authentication';

// CSS import
import "../../src/styles.css";

export const UserLogin = () => {
	const [dockNumber, setDockNumber] = useState('');
	const [password, setPassword] = useState('');
	const doLogin = useAuthenticationStore((state) => state.doLogin);
	const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

	// Watcher that clears fields on successful login 
	useEffect(() => {
		if(isAuthenticated) {
			setDockNumber("");
			setPassword("");
		} 
	}, [isAuthenticated])

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
		  	<button className="BlueButton" onClick={async () => await doLogin(dockNumber, password)}>
  			Log in
			</button>
		  </div>
		</div>
	  </div>
  );
}

export default UserLogin;
