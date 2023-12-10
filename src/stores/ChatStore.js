import { create } from "zustand";
import {
  //parse DB fields
  _sender_user_id, 
  _receiver_user_id,
  _message_date,
  _message,
  _message_text,
  _username,
  //functions
  getUserName,
  getMessageDate,
  getMessageText
} from "../parse/parseHelper";
import {createCombinedMessagesQueryInDescendingOrder} from '../parse/queryBuilder';

export default create((set, get) => ({
    latestMessageInThreads:[],
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
    filterLatestMessageInThreadsBySearchTerm(searchTerm) {
      const messages = get().latestMessageInThreads;
      const filteredChats = searchTerm
      ? messages.filter((msg) =>
          msg.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.chatText.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : messages;

      return filteredChats;
    }
}));

async function createChatPartnerMapping(results, userId) {
  const chatPartnersMap = [];

  results.forEach(message => {
    const senderId = message.get(_sender_user_id).id;
    const receiverId = message.get(_receiver_user_id).id;
    const isSender = senderId === userId;
    const partnerId = isSender ? receiverId : senderId;
    //Finding the correct object to get the username from, using the same logic as above.
    const existingMessageIndex =  chatPartnersMap.findIndex(msgObj => msgObj.partnerId === partnerId);
    const existingMessage = existingMessageIndex !== -1;
    if (!existingMessage || message.get(_message_date) > chatPartnersMap[existingMessageIndex].message.get(_message_date)) {
     
      const messageObject = {
        isSender,
        partnerId,
        chatDate: getMessageDate(message),
        chatText: getMessageText(message),
        message
      }

      if(!existingMessage)
        chatPartnersMap.push(messageObject);
      else chatPartnersMap[existingMessageIndex]=messageObject;
  }})

  //await all partnername queries.
  await Promise.all(chatPartnersMap.map(async message => {
    const _partner_id = message.isSender ? _receiver_user_id : _sender_user_id;
    let partnerName = message.message.get(_partner_id).get(_username);
    if(!partnerName)
      partnerName = await getUserName(message.partnerId);
    message.partnerName = partnerName;
  }));  
  return chatPartnersMap;
}