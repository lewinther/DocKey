import React, { useEffect, useState } from 'react';
import Parse from 'parse';
// import ChatCard from "./ChatCard";
import "../../src/styles.css";

export default function ChatListInbox() {
  const [chats, setChats] = useState([]);
  const currentUser = 'YznbDiMrX1'; // temporary hard-coded user ID

  useEffect(() => {
    // Queries for messages where the current user is either sender or receiver.
    const sentMessagesQuery = new Parse.Query('Message');
    sentMessagesQuery.equalTo('Sender_User_ID', currentUser);

    const receivedMessagesQuery = new Parse.Query('Message');
    receivedMessagesQuery.equalTo('Receiver_User_ID', currentUser);

    // Combined query for either sent or received messages.
    const combinedQuery = Parse.Query.or(sentMessagesQuery, receivedMessagesQuery);
    combinedQuery.descending('Message_Date');
    combinedQuery.select('Sender_User_ID', 'Receiver_User_ID', 'Message_Text', 'Message_Date'); // Make sure to select 'Message_Date' and 'Message_Text'.

    combinedQuery.find().then(results => {
      // Use a Map to track the most recent message for each chat partner.
      const chatPartnersMap = new Map();

      results.forEach(message => {
        const senderId = message.get('Sender_User_ID').id;
        const receiverId = message.get('Receiver_User_ID').id;
        const partnerId = senderId === currentUser ? receiverId : senderId;

        const existingMessage = chatPartnersMap.get(partnerId);
        if (!existingMessage || message.get('Message_Date') > existingMessage.get('Message_Date')) {
          chatPartnersMap.set(partnerId, message);
        }
      });

      // Convert to an array of messages to set in state.
      const latestMessages = Array.from(chatPartnersMap.values());
      // Ensure you have messages and Message_Date is not undefined before setting state.
      const filteredMessages = latestMessages.filter(msg => msg && msg.get('Message_Date'));
      setChats(filteredMessages); // Update state with the filtered messages.
      console.log(filteredMessages); // Print the messages for testing purposes.

    }).catch(error => {
      console.error('Error fetching chat partners or messages: ', error);
    });

  }, []); // Empty dependency array means this effect will only run once on component mount.

  // Render a list of ChatCards for each chat.
  return (
    <div className="chat-list-inbox">
      {chats.map((message, index) => {
        const chatDate = message.get('Message_Date') ? message.get('Message_Date').toDateString() : 'Unknown date';
        const chatPartnerId = message.get('Sender_User_ID').id === currentUser ? message.get('Receiver_User_ID').id : message.get('Sender_User_ID').id;
        const chatPreviewText = message.get('Message_Text'); // Use the correct key for message text.

        // Replace the div below with your ChatCard component when ready.
        return (
          <div key={index} className="chat-card">
            <p>Chat with: {chatPartnerId}</p>
            <p>Date: {chatDate}</p>
            <p>Preview: {chatPreviewText}</p>
          </div>
        );
      })}
    </div>
  );
}
