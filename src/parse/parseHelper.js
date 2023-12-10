import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export const _sender_user_id = 'Sender_User_ID';
export const _receiver_user_id = 'Receiver_User_ID';
export const _message_date = 'Message_Date';
export const _message = 'Message';
export const _message_text = "Message_Text";
export const _username = 'username';

export const _messageFields = {
    message: 'Message',
    date: 'Message_Date',
    text: 'Message_Text',
    senderId: 'Sender_User_ID',
    receiverId: 'Receiver_User_ID',

}


export async function getUserName(userId) {
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('objectId', userId);
    let result = await userQuery.first();
    return result.get(_username);
  }
  
export function getMessageDate(msg) {
    const messageDate = msg.get(_message_date).toLocaleDateString();
    return messageDate ? messageDate : 'Unknown date';
  }

export function getMessageText(msg) {
    return msg.get(_message_text);
  }