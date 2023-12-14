import { create } from "zustand";

import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default create ((set) => ({
	user: undefined,
	doRestoreSession: async () => {
		const currentUser = await Parse.User.current();
		set((state) => ({user: currentUser === null ? undefined : currentUser}));
	},

	// login error state
	dockNumberError: null,
	passwordError: null,

	doLogin: async (username, password) => {
		try {
			// Clear previous errors
			set((state) => ({ dockNumberError: null, passwordError: null }));
	  
			const loggedInUser = await Parse.User.logIn(username, password);
			set((state) => ({ user: loggedInUser, loginError: null }));
		  } catch (error) {
			// Set errors based on the type of error
			if (error.code === 101) {
			  // Incorrect username/password
			  set((state) => ({ dockNumberError: "Invalid username", passwordError: "Invalid password" }));
			} else {
			  set((state) => ({ loginError: error.message }));
			}
		  }
		},
	doLogout: async () => {
		try {
			await Parse.User.logOut();
			// To verify that current user is now empty, currentAsync can be used
			const currentUser = await Parse.User.current();
			if (currentUser === null) {
				set((state) => ({user: undefined}));
			}
		}
		catch (error) {
			alert(`Error! ${error.message}`);
		  }
	}
}));