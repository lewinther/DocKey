export async function markMessagesAsRead(messageIdsToUpdate) {
    //send a list of messageIds to the server. for each entry, set message.isRead true.
}

export async function getAllMessages() {
    return Promise.resolve(
        [ //messages
            {
              id:'0',
              sender:'',
              receiver:'',
              text:'asdasd',
              image:'http://tinyurl.com/m8eeusct',
              isRead:false,
              date: Date(),
            }
        ]
    );
}

export async function sendMessage(receiver, sender, text, imageFile) {
    const imageUrl = uploadImage(imageFile);
    //send object to database
}

async function uploadImage(imageFile) {
    //send image to storage, retrieve link, return URL.
}