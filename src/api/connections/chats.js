import {supabase} from '../supabase/supabaseClient';

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
    const imageUrl = uploadImage(imageFile);
    //send object to database
}

async function uploadImage(imageFile) {
    //send image to storage, retrieve link, return URL.
}