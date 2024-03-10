import { create 
} from "zustand";
import { 
	fetchUserProfile, 
	fetchChatPartnerProfile, 
	doRestoreSession,
	releaseSession,
	setSession
} from "../api/connections/users";
import {
	signIn, 
	signOut,
	isUserLoggedIn
} from "../api/connections/auth";

export default create ((set, get) => ({
	user:undefined,
	profile: undefined,
	passwordError: null,
	signIn: async (username, password) => {
		const result = await signIn(username, password);
		if(result === true) {
			const profile = await fetchUserProfile();
			set({user:{id:profile.id}, profile, passwordError: null});
			setSession(profile, profile.id);
		}else {
			set({passwordError: result});
		}
	},
	signOut: async () => {
		let result = await signOut();
		if(result) {
			set({user:undefined, profile: undefined});
			releaseSession();
		}
	},
	doRestoreSession: async () => {	
		if(await isUserLoggedIn()) {
			const session = await doRestoreSession();
			set({user:{id:session.storedUserID}, profile: session.storedProfile});
		} else await signOut();
	},
	getFullName: () => {
		return get().profile.firstName + ' ' + get().profile.lastName;
	},
	fetchChatPartnerProfile: async (chatPartner) => {
		return await fetchChatPartnerProfile(chatPartner);
	},
	setProfileImage: async() => {
		throw Error("should store image in supabase storage, and connect it to the user profile by URL");
	},
	setNewPassword: async () => {
		throw Error("should set new password for user");
	}
}));