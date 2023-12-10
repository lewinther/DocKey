import { create } from "zustand";

import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const _sender_user_id = 'Sender_User_ID';
const _receiver_user_id = 'Receiver_User_ID';
const _message_date = 'Message_Date';
const _message = 'Message';
const _message_text = "Message_Text";
const _username = 'username';

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

//Parse Helper starts
async function getUserName(userId) {
  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo('objectId', userId);
  let result = await userQuery.first();
  return result.get(_username);
}

function getMessageDate(msg) {
  const messageDate = msg.get('Message_Date').toLocaleDateString();
  return messageDate ? messageDate : 'Unknown date';
}

function getMessageText(msg) {
  return msg.get('Message_Text');
}
//Parse Helper ends

//Query Builder starts
function createCombinedMessagesQueryInDescendingOrder(userId) {
    //Create a combined query 
    //returning all message where the user 
    //is either sender or reciever in a descending order by date.
    const sentMessagesQuery = 
    createMessagesQuery(_sender_user_id, userId);
    const receivedMessagesQuery = 
    createMessagesQuery(_receiver_user_id, userId);
    const combinedQuery = 
    Parse.Query.or(sentMessagesQuery, receivedMessagesQuery);
    combinedQuery.descending(_message_date);
    // Make sure to select 'Message_Date' and 'Message_Text'.    
    combinedQuery.select (
        _sender_user_id, 
        _receiver_user_id, 
        _message_text, 
        _message_date
    ); 
    return combinedQuery;
}

function createMessagesQuery(field, userId) {
  const messagesQuery = new Parse.Query(_message);
  messagesQuery.equalTo(field, userId);
  return messagesQuery;
}
//Query Builder ends