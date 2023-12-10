import React, { Fragment, useEffect, useState } from 'react';
import Parse from 'parse';
import ChatCard from "./ChatCard";
import { useNavigate} from "react-router-dom";
import "../../src/styles.css";

export default function ChatListInbox({ searchTerm }) {
  const [chats, setChats] = useState([]);
  
  // get item from local storage 'Parse/ Application ID / currentUser'
  const localStorageUserData = localStorage.getItem('Parse/' + Parse.applicationId + '/currentUser');
  const userData = localStorageUserData ? JSON.parse(localStorageUserData) : {};
  
  // Use the objectId from local storage or a default value
  const currentUser = userData.objectId 

  const navigate = useNavigate(); // Hook for programmatically navigating

  // Function to handle chat card click
  const handleChatClick = (chatPartnerID) => {
    navigate(`/Chat`, { state: { chatPartnerID} });
  };

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
          const partnerId = parseMessage.get('Sender_User_ID').id === currentUser ? parseMessage.get('Receiver_User_ID').id : parseMessage.get('Sender_User_ID').id;
          return {
            parseMessage,
            partnerUsername: userIdToUsernameMap[partnerId] || 'Unknown',
          };
        });
      
        return chatsWithUsernames;
      });

    }).then((chatsWithUsernames) => {
      const filteredChats = searchTerm
        ? chatsWithUsernames.filter(({ parseMessage, partnerUsername }) =>
            partnerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parseMessage.get('Message_Text').toLowerCase().includes(searchTerm.toLowerCase())
          )
        : chatsWithUsernames;


        setChats(filteredChats);
      }).catch(error => {
        console.error('Error fetching chat partners or messages: ', error);
      });
    }, [searchTerm, currentUser]); 


return (
  <Fragment>
    <div className="message-list">
      {chats.map(({ parseMessage, partnerUsername }, index) => {
        const chatPartnerID = parseMessage.id; // Assuming you have the id property available.
        const chatDate = parseMessage.get('Message_Date').toLocaleDateString() ? parseMessage.get('Message_Date').toLocaleDateString() : 'Unknown date';
        const chatPreviewText = parseMessage.get('Message_Text'); // Use the correct key for message text.

        return (
          <ChatCard
            key={index}
            chatPartnerID={chatPartnerID}
            chatPartnerUsername={partnerUsername}
            chatDate={chatDate}
            chatPreviewText={chatPreviewText}
            onClick={() => handleChatClick(chatPartnerID)}
          />
        );
      })}
    </div>
  </Fragment>
)
  
  
};