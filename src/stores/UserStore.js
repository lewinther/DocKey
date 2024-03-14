import { create 
} from "zustand";
import { 
	fetchUserProfile, 
	doRestoreSession,
	releaseSession,
	setSession,
	setProfileImage
} from "../api/connections/users";
import {
	signIn, 
	signOut,
	isUserLoggedIn,
	changePassword
} from "../api/connections/auth";

export default create ((set, get) => ({
	user:undefined,
	profile: undefined,
	passwordError: null,
	signIn: async (username, password) => {
		const result = await signIn(username, password);
		if(result === true) {
			const session = await createUserSession();
			set({user:session.user, profile: session.profile, passwordError: null});
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
			if(!session)
				createUserSession();
			else
				set({user:{id:session.storedUserID}, profile: session.storedProfile});
		} else await signOut();
	},
	getFullName: () => {
		return get().profile.firstName + ' ' + get().profile.lastName;
	},
	setProfileImage: async(imageFile) => {
		const profile = await setProfileImage(get().user.id, imageFile);
		const session = await updateUserSession(profile);
		set({user:session.user, profile: session.profile});
	},
	setNewPassword: async (password) => {
		return await changePassword(password);
	}
}));

async function createUserSession() {
	const profile = await fetchUserProfile();
	return await updateUserSession(profile);
}

async function updateUserSession(profile) {
	setSession(profile, profile.id);
	return {user:{id:profile.id}, profile};
}