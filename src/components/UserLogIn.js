import React, { Fragment, useState} from "react";

// Stores (has to be first)
import useAuthenticationStore from '../stores/Authentication';

// CSS import
import "../../src/styles.css";

export const UserLogin = () => {
	const [dockNumber, setDockNumber] = useState('');
	const [password, setPassword] = useState('');
	const [currentUser, setCurrentUser] = useState(null);
	const doLogin = useAuthenticationStore((state) => state.doLogin);

/*
	Function that will return current user and also update current username
*/

//   const getCurrentUser = async function () {
//     const currentUser = await Parse.User.current();
// // Update state variable holding current user
//     setCurrentUser(currentUser);
//     return currentUser;
// };

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
