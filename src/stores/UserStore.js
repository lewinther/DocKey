import { create } from "zustand";

import Parse from "parse";
import { collectProfileData } from "../parse/parseHelper";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default create ((set, get) => ({
	user: undefined,
	profile: {
		profileImage: '',
		firstName: '',
		lastName: '',
		phoneNr: '',
		email: '',
	},

	// login error state
	dockNumberError: null,
	passwordError: null,

	doRestoreSession: async () => {
		const currentUser = await Parse.User.current();
		set((state) => ({user: currentUser === null ? undefined : currentUser}));
		await get().collectProfileData();
	},
doLogin: async (username, password) => {
  try {
    // Clear previous errors
    set((state) => ({ dockNumberError: null, passwordError: null }));
  
    const loggedInUser = await Parse.User.logIn(username, password);
    set((state) => ({ user: loggedInUser, loginError: null }));
			await get().collectProfileData();
  } catch (error) {
    // Set a generic error message for invalid username or password
    set((state) => ({ dockNumberError: "Invalid username or password", passwordError: "Invalid username or password" }));
  }
},
	
	doLogout: async () => {
		try {
			await Parse.User.logOut();
			// To verify that current user is now empty, currentAsync can be used
			const currentUser = await Parse.User.current();
			localStorage.removeItem('newsArticles');
			localStorage.removeItem('lastFetchTime');
			if (currentUser === null) {
				set((state) => ({user: undefined}));
			}
		}
		catch (error) {
			alert(`Error! ${error.message}`);
		  }
	},
	getFullName: () => {
		return get().profile.firstName + ' ' + get().profile.lastName;
	},
	collectProfileData: async () => {
		let profile = await collectProfileData(get().user.id);
		set((state) => ({profile: profile}));
	},

}));