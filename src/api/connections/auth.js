import {supabase} from '../supabase/supabaseClient';

export async function signIn(username, password) {
    const {error} = await supabase.auth.signInWithPassword(
        {
            email: username, 
            password: password
        });
    if(error){
        console.log(error.message);
        if(error.status === 400) return 'sign-in failed, did you type in the right email & password?';
        return 'something went wrong please try again later';
    }
    return true;
}

export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if(error)
        console.log(error.message);
    else return true;
    return false;
}

export async function isUserLoggedIn() {
    const {data} = await supabase.auth.getSession();
    if(data.session === null) return false;
    return true;
}