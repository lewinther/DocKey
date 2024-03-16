import {supabase} from '../supabase/supabaseClient';

export async function uploadImage(filepath, bucket, avatarFile) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filepath, avatarFile,
        {
            upsert: true
        }
    );

    if(error){
        console.log(error.message);
        throw error;
    }

    return data;
}

export async function getPublicUrl(bucket, path) {
    const {data, error} = await supabase.storage
    .from(bucket)
    .getPublicUrl(path);

    if(error){
        console.log(error.message);
        throw error;
    }

    return data;
}
