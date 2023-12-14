import React, { Fragment, useEffect, useState} from "react";

// Stores (has to be first)
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

export default () => {
	const [dockNumber, setDockNumber] = useState('');
	const [password, setPassword] = useState('');
	const doLogin = useUserStore((state) => state.doLogin);
	const user = useUserStore((state) => state.user);
	const dockNumberError = useUserStore((state) => state.dockNumberError);
	const passwordError = useUserStore((state) => state.passwordError);

	// Watcher that clears fields on successful login 
	useEffect(() => {
		if(user) {
			setDockNumber("");
			setPassword("");
		} 
	}, [user])

	return(
		<div>
		<div className="in-column">
		  <h1>Log into your account</h1>
		  <div className="textarea">
			<input
			  className="search-input"
			  type="text"
			  placeholder="Dock Number"
			  value={dockNumber}
			  onChange={(e) => setDockNumber(e.target.value.toLocaleUpperCase())}
       		 />
       		{dockNumberError && <p style={{ color: 'red' }}>{dockNumberError}</p>}
			
			<input
			  className="search-input"
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
       	 	/>
        	{passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
		  
		</div>
  
		<div className="button-container">
		  <div className="button-group">
		  	<button className="attach-button" onClick={async () => await doLogin(dockNumber, password)}>
  			Log in
			</button>
		  </div>
		</div>
	  </div>
	  </div>
  );
};

