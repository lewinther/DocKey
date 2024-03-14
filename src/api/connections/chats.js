import {supabase} from '../supabase/supabaseClient';
import { uploadImage, getPublicUrl} from './images';
export async function markMessagesAsRead(messageIdsToUpdate) {
    //send a list of messageIds to the server. for each entry, set message.isRead true.
}

export async function getAllMessages() {
    const {data, error} = 
    await supabase.from('messages').select();

    if(error){
        console.log(error.message);
        throw new error(error);
    }

    const messages = [];
    data.map(x => {
        messages.push(
            {
                id: x.id,
                sender: x.sender_id,
                receiver: x.receiver_id,
                text: x.message_content,
                image: x.image,
                isRead: x.isRead,
                date: new Date()//x.created_at,
              }
            );
        }
    );
    return messages;
}

export async function sendMessage(receiver, sender, text, imageFile) {
    console.log(imageFile.file.name);
    const bucket = 'messages';
    const path = "messages/"+sender+"/"+imageFile.file.lastModified+"_"+imageFile.file.name;
    const image = await uploadImage(path, bucket, imageFile.file);
    const public_url = await getPublicUrl(bucket, image.path);
    const { data, error } = await supabase
    .from('messages')
    .insert([
        { 
            sender_id: sender,
            receiver_id: receiver,
            message_content: text,
            image:public_url.publicUrl
        }
    ])
    .select();

    if(error){
        console.log(error.message);
        throw new error(error);
    }

    return data;
}