// using zustand for global state management
import { create } from "zustand";

// Parse SDK
// open-source application framework 
// that provides a suite of tools 
// to develop app backends quickly and efficiently
import Parse from "parse";

// Helper functions
import { collectProfileData } from "../parse/parseHelper";

// Connect to Parse Server
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// Create a global state store
export default create ((set, get) => ({
	// stores current user data
	user: undefined,
	// stores current user profile 
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

	// restores a user session if one exists
	doRestoreSession: async () => {
		// async:  way to handle operations that might take some time to complete, 
		// such as fetching data from a server, reading files, or performing complex computations, 
		// without blocking the execution of the rest of the code.

		// To verify that current user is empty, currentAsync can be used
		const currentUser = await Parse.User.current();
		// restores a user session if one exists
		set((state) => ({user: currentUser === null ? undefined : currentUser}));
		// fetch user profile data
		await get().collectProfileData();
		// await: inside an async function, 
		// you can use the await keyword before a function call 
		// to pause the execution of the async function 
		// until the awaited Promise is resolved (i.e., completed).

		// get() is a function provided by Zustand 
		// that allows you to access the current state 
		// and methods of the store from within another method in the store.
	},

	// logs in a user with parse
	doLogin: async (username, password) => {
		try {
			// Clear previous errors
			set((state) => ({ dockNumberError: null, passwordError: null }));
			
			// Login with Parse
			const loggedInUser = await Parse.User.logIn(username, password);
			// Save user credentials to global state
			set((state) => ({ user: loggedInUser, loginError: null }));
			// fetch user profile data
			await get().collectProfileData();

		} catch (error) {
			// Set a generic error message for invalid username or password
			set((state) => ({ dockNumberError: "Invalid username or password", passwordError: "Invalid username or password" }));
		}
	},
	// logs out a user
	doLogout: async () => {
		try {
			// Logs out the current user with Parse
			await Parse.User.logOut();
			// To verify that current user is now empty, currentAsync can be used
			const currentUser = await Parse.User.current();
			// empty local storage when user logs out
			localStorage.removeItem('newsArticles');
			localStorage.removeItem('lastFetchTime');
			// reset user state in global state
			if (currentUser === null) {
				set((state) => ({user: undefined}));
			}
		}
		catch (error) {
			alert(`Error! ${error.message}`);
		  }
	},
	// returns the full name of the user --> reason for fetching profile data in global state
	getFullName: () => {
		return get().profile.firstName + ' ' + get().profile.lastName;
	},

	// calls collectProfileData function from parseHelper.js
	collectProfileData: async () => {
		const user = get().user;
		if (!user || !user.id) {
			console.error("User is not logged in");
			return;
		}
		let profile = await collectProfileData(user.id);
		set((state) => ({profile: profile}));
	},
	

}));