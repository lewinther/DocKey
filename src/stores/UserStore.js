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
	//Function that will return current user and also update current username
	getCurrentUser: async () => {
		try{
			const currentUser = await Parse.User.current();
			set((state) => ({user: currentUser}));

		}
		catch (error) {
			alert(`Error! ${error.message}`);
		  }
	}
}));