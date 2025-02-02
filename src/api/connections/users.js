import {supabase} from "../supabase/supabaseClient";
import { uploadImage, getPublicUrl} from './images';

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

export async function fetchPotentialChatPartners() {
    const {data, error} = await supabase
    .from('public_profiles')
    .select();

    if(error){
        console.log(error.message);
        throw new error(error);
    }

    const partners = [];
    data.map(x => {
        partners.push(
            {
                username:x.username,
                userId:x.user_id,
                image: x.image
            });
        }
    );
    return partners;
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

export async function setProfileImage(userId, imageFile) {
    const bucket = 'avatars';
    const path = "profiles/"+userId+"/"+imageFile.file.name;
    const image = await uploadImage(path, bucket, imageFile.file);
    const public_url = (await getPublicUrl(bucket, image.path)).publicUrl;

    const {data, error} = await supabase
    .from('profiles')
    .update({'image': public_url})
    .eq('user_id', userId)
    .select();

    await supabase
    .from('public_profiles')
    .update({'image': public_url})
    .eq('user_id', userId)
    .select();

    if(error){
        console.log(error.message);
        throw error;
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