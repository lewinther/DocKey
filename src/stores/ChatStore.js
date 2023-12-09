import { create } from "zustand";

import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default create((set) => ({
    doGetMessagesForUser: (userId) => {
        // Combined query for either sent or received messages.
        const combinedQuery = createCombinedQuery(userId);
        combinedQuery.descending('Message_Date');
        // Make sure to select 'Message_Date' and 'Message_Text'.    
        combinedQuery.select (
            'Sender_User_ID', 
            'Receiver_User_ID', 
            'Message_Text', 
            'Message_Date'
        ); 
        return combinedQuery;
    },
}));

function createCombinedQuery(userId) {
    //Create a combined query returning all message where the user is either sender or reciever.
    const sentMessagesQuery = createMessagesQuery('Sender_User_ID',userId);
    const receivedMessagesQuery = createMessagesQuery('Receiver_User_ID',userId);
    return Parse.Query.or(sentMessagesQuery, receivedMessagesQuery);
}

function createMessagesQuery(field, userId) {
  const messagesQuery = new Parse.Query("Message");
  messagesQuery.equalTo(field, userId);
  return messagesQuery;
}
