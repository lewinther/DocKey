import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";

import useUserStore from "../stores/UserStore";
import useChatStore from "../stores/ChatStore";

//CSS import
import "../../src/styles.css";

export default function ChatListInbox({ searchTerm }) {
  const [chats, setChats] = useState([]);
  // Hook for programmatically navigating
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {doGetMessagesForUser} = useChatStore();
  // Function to handle chat card click
  const handleChatClick = (chatPartnerID) => {
    const userId = user.id;
    navigate(`/Chat`, { state: { chatPartnerID, userId } });
  };

  useEffect(() => {
    if(!user) return;
    async function updateViewData() {
      try {
        const chatsWithUsernames = await doGetMessagesForUser(user.id);
        const filteredChats = searchTerm
        ? chatsWithUsernames.filter(({ parseMessage, partnerUsername }) =>
            partnerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parseMessage.get('Message_Text').toLowerCase().includes(searchTerm.toLowerCase())
          )
        : chatsWithUsernames;
        setChats(filteredChats);
      }
      catch(error) {
        console.error('Error fetching chat partners or messages: ', error);
      }
    }
    (async () => {
      await updateViewData();
    })();

    }, [searchTerm, user]); 


return (
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
)
  
  
};