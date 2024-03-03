import { create 
} from "zustand";
import { fetchUserProfile, fetchChatPartnerProfile
} from "../api/connections/users";
import {
	signIn, 
	signOut, 
	doRestoreSession
} from "../api/connections/auth";

export default create ((set, get) => ({
	user: {
		id:''
	},
	profile: {
		id:'',
		image: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		username: '',
	},
	doRestoreSession: async () => {
		//restore existing session, somehow.
		await doRestoreSession();
	},
	signIn: async (username, password) => {
		const result = await signIn(username, password);
		if(result)
			set({user:{id:'user-id'}});
	},
	signOut: async () => {
		let result = await signOut();
		if(result)
			set({user:undefined});
	},
	getFullName: () => {
		return get().profile.firstName + ' ' + get().profile.lastName;
	},
	fetchUserProfile:() => {
		set({ profile: fetchUserProfile()});
	},
	fetchChatPartnerProfile: async (chatPartner) => {
		return await fetchChatPartnerProfile(chatPartner);
	}
}));