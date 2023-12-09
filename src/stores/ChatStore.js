import { create } from "zustand";

import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default create((set) => ({
    doGetMessagesForUser: async (userId) => {
        // Combined query for either sent or received messages.
        const combinedQuery = createCombinedMessagesQueryInDescendingOrder(userId);
        const results = await combinedQuery.find();
        return throwAway(results, userId);
    }
}));

function createCombinedMessagesQueryInDescendingOrder(userId) {
    //Create a combined query 
    //returning all message where the user 
    //is either sender or reciever in a descending order by date.
    const sentMessagesQuery = 
    createMessagesQuery('Sender_User_ID',userId);
    const receivedMessagesQuery = 
    createMessagesQuery('Receiver_User_ID',userId);
    const combinedQuery = 
    Parse.Query.or(sentMessagesQuery, receivedMessagesQuery);
    combinedQuery.descending('Message_Date');
    // Make sure to select 'Message_Date' and 'Message_Text'.    
    combinedQuery.select (
        'Sender_User_ID', 
        'Receiver_User_ID', 
        'Message_Text', 
        'Message_Date'
    ); 
    return combinedQuery;
}

function createMessagesQuery(field, userId) {
  const messagesQuery = new Parse.Query("Message");
  messagesQuery.equalTo(field, userId);
  return messagesQuery;
}

function throwAway(results, userId) {
        // Use a Map to track the most recent message for each chat partner.
        const chatPartnersMap = new Map();
  
        results.forEach(message => {
          const senderId = message.get('Sender_User_ID').id;
          const receiverId = message.get('Receiver_User_ID').id;
          const partnerId = senderId === userId ? receiverId : senderId;
  
          const existingMessage = chatPartnersMap.get(partnerId);
          if (!existingMessage || message.get('Message_Date') > existingMessage.get('Message_Date')) {
            chatPartnersMap.set(partnerId, message);
          }
        });
  
        // Convert to an array of messages to set in state.
        const latestMessages = Array.from(chatPartnersMap.values());
        // Ensure you have messages and Message_Date is not undefined before setting state.
        const filteredMessages = latestMessages.filter(msg => msg && msg.get('Message_Date'));
        // Now, fetch usernames for each chat partner ID using the user IDs gathered
        const chatPartnerUsernamesPromises = Array.from(chatPartnersMap.keys()).map((partnerId) => {
          const userQuery = new Parse.Query(Parse.User);
          userQuery.equalTo('objectId', partnerId);
          return userQuery.first().then((user) => {
            return user ? { id: partnerId, username: user.get('username') } : null;
          });
        });
  
        return Promise.all(chatPartnerUsernamesPromises).then((usernames) => {
          // Create a map of user IDs to usernames
          const userIdToUsernameMap = usernames.reduce((acc, user) => {
            if (user) acc[user.id] = user.username;
            return acc;
          }, {});
        
          // Add the usernames to the chat messages
          const chatsWithUsernames = filteredMessages.map((parseMessage) => {
            const partnerId = parseMessage.get('Sender_User_ID').id === userId ? parseMessage.get('Receiver_User_ID').id : parseMessage.get('Sender_User_ID').id;
            return {
              parseMessage,
              partnerUsername: userIdToUsernameMap[partnerId] || 'Unknown',
            };
          });
        
          return chatsWithUsernames;
        });
}