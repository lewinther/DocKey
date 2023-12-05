import { create } from "zustand";
import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default create((set) => ({
	isAuthenticated:false,
	doLogin: async (username, password) => {
		try {
			await Parse.User.logIn(username, password);
			set((state) => ({isAuthenticated: true}));
		}
		catch (error){
			// Error can be caused by wrong parameters or lack of Internet connection
			alert(`Error! ${error.message}`);
		}
	},
	doLogout: async () => {
		try {
			await Parse.User.logOut();
			// To verify that current user is now empty, currentAsync can be used
			const currentUser = await Parse.User.current();
			if (currentUser === null) {
				set((state) => ({isAuthenticated: false}));
			}
		}
		catch (error) {
			alert(`Error! ${error.message}`);
		  }
	}
}));

//TODO: when user has signed in successfully, empty login fields
// 		  setCurrentUser("");
// 		  setPassword("");

//TODO: when user has signed in, get user in zustand user store
// 		  const currentUser = await Parse.User.current();
// 		  getCurrentUser();
