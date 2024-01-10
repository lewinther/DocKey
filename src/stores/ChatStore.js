import { create } from "zustand";
// helper functions
import {
  //parse DB fields
  _sender_user_id, 
  _receiver_user_id,
  _message_date,
  _message,
  _message_text,
  _username,
  _profile_image,
  //functions
  getUserName,
  getMessageDate,
  getMessageText,
  isMessageUnread,
  markMessagesAsRead,
  getProfileImage,
  getUnreadMessagesCount
} from "../parse/parseHelper";
// helper functions
import {
  createCombinedMessagesQueryInDescendingOrder, 
  GetAllMessagesByFieldId
} from '../parse/queryBuilder';

// Zustand store for chat messages
export default create((set, get) => ({

    markMessagesAsRead: async (ChatPartnerID, userID) => {
        try {
            await markMessagesAsRead(ChatPartnerID, userID);
        } catch (error) {
            console.error('Error updating message read status:', error);
        }
    },
    latestMessageInThreads:[],
    // Get the latest message for each chat
    doGetLatestMessageInEachUniqueThread: async (userId) => {
        // Combined query for either sent or received messages.
        const combinedQuery = createCombinedMessagesQueryInDescendingOrder(userId);
        const results = await combinedQuery.find();
        // Map the most recent message for each chat partner.
        // Ensure you have messages and that Message_Date is defined before setting state.
        const messages = 
        (await createChatPartnerMapping(results, userId))
        .filter(msg => msg.message && msg.message.get(_message_date));
        set({ latestMessageInThreads: messages });
    },
    // Search function
    filterLatestMessageInThreadsBySearchTerm(searchTerm) {
      const messages = get().latestMessageInThreads;
      const filteredChats = searchTerm
      ? messages.filter((msg) =>
          msg.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.chatText.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : messages;

      return filteredChats;
    },
    //sender = chatpartner
    //reciever = viewing user
    doGetMessagesForThread: async (senderId, receiverId) => {
      // Get all messages sent and received by the user
      let received = await GetAllMessagesByFieldId('Receiver_User_ID', receiverId);
      // Filter the received messages to only include those from the chat partner
      received = received.filter((x) => x.get("Sender_User_ID").id == senderId);
      // Get all messages sent by the user
      let sent = await GetAllMessagesByFieldId('Sender_User_ID', receiverId);
      // Filter the sent messages to only include those to the chat partner
      sent = sent.filter((x) => x.get("Receiver_User_ID").id == senderId);
      // Combine the sent and received messages
      let tmpMessages = [...received, ...sent];
      // Sort the messages by date and reverse the order
      return tmpMessages.sort((a,b) => a.get("Message_Date") - b.get("Message_Date")).reverse();
    },
}));

async function createChatPartnerMapping(results, userId) {
  // instantiate an empty array to store the chat partners
  const chatPartnersMap = [];

  // Loop through the messages 
  for (const message of results) {
    // Get the sender and receiver IDs
    const senderId = message.get(_sender_user_id).id;
    const receiverId = message.get(_receiver_user_id).id;
    // Determine the sender and receiver of the message
    const isSender = senderId === userId;
    const partnerId = isSender ? receiverId : senderId;

    // Check if the chat partner already exists in the array
    const existingMessageIndex = chatPartnersMap.findIndex(msgObj => msgObj.partnerId === partnerId);
    
    // Check if a message from this partner already exists in the array
    const existingMessage = existingMessageIndex !== -1;

    // If no message exists or the actual message is more recent than the existing one, add it to the array
    if (!existingMessage || message.get(_message_date) > chatPartnersMap[existingMessageIndex].message.get(_message_date)) {
      // Create a message object
      const messageObject = {
        messageId: message.id,
        isSender,
        partnerId,
        chatDate: getMessageDate(message),
        chatText: getMessageText(message),
        message,
        unread: isMessageUnread(message),
        userId
      };
      // Add the message object to the array
      if (!existingMessage)
        // Add the message object to the array
        chatPartnersMap.push(messageObject);
      else
        // Update to the most recent message object in the array
        chatPartnersMap[existingMessageIndex] = messageObject;
    }
  }

  await Promise.all(chatPartnersMap.map(async (message) => {
    // Promise all is used to wait for all of the promises returned by the map operation to resolve. 
    // This means all the asynchronous operations (fetching names, images, and unread message counts) are executed concurrently, 
    // and the next step in the code will wait until all of these operations are complete
    const partnerName = await getUserName(message.partnerId);
  
    // Fetch partner profile image
    const profileImage = await getProfileImage(message.partnerId);

    // Fetch unread messages count
    const unreadMessagesCount = await getUnreadMessagesCount(message.userId, message.partnerId);
  
  
    // Update message object
    message.partnerName = partnerName;
    message.profileImage = profileImage ? (typeof profileImage.url === 'function' ? profileImage.url() : null) : null;
    message.unreadMessagesCount = unreadMessagesCount;
  }));
  
  return chatPartnersMap;
}
