import Parse from "parse";
import {
  //parse DB fields
_sender_user_id, 
_receiver_user_id,
_message_date,
_message,
_message_text,
_username
} from "./parseHelper";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export function createCombinedMessagesQueryInDescendingOrder(userId) {
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

export function createMessagesQuery(field, userId) {
  const messagesQuery = new Parse.Query(_message);
  messagesQuery.equalTo(field, userId);
  return messagesQuery;
}