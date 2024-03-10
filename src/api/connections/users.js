import {supabase} from "../supabase/supabaseClient";

export async function fetchUserProfile(){
    const {data, error} = await supabase.from('profiles').select();
    if(error){
        console.log(error.message);
        throw new error(error);
    }
    const p = data[0];
    return {
		id: p.user_id,
		image: p.image,
		firstName: p.first_name,
		lastName: p.last_name,
		phoneNumber: p.phone_number,
		email: p.email,
		username: p.username,
	};
}

export async function fetchChatPartnerProfile(chatPartner) {
    return Promise.resolve ([
        {
            id: chatPartner,
            image: '',
            username: ''
        }
    ]);
}

export async function fetchPotentialChatPartners() {
    return Promise.resolve ([
        {
            username:'p1',
            userId:'user-A'
        },
        {
            username:'p2',
            userId:'user-B'
        },
        {
            username:'p3',
            userId:'user-C'
        }
    ])
}

export async function doRestoreSession() {
    const storedUserID = localStorage.getItem("userId");
    const storedProfile =  JSON.parse(localStorage.getItem("profile"));
    const session  = {storedUserID, storedProfile};
    if(storedUserID && storedProfile) return session;
    return undefined;
}

export async function setSession(profile, userId) {
    localStorage.setItem("userId", userId);
    localStorage.setItem("profile", JSON.stringify(profile));
}

export async function releaseSession() {
    localStorage.removeItem("userId");
    localStorage.removeItem("profile");
}