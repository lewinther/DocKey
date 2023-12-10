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
  const {doGetMessagesForUser, filterDisplayMessagesForSearchTerm} = useChatStore();
  // Function to handle chat card click
  const handleChatClick = (chatPartnerID) => {
    const userId = user.id;
    navigate(`/Chat`, { state: { chatPartnerID, userId } });
  };

  useEffect(() => {
    if(!user) return;
    async function updateViewData() {
      // try {
        await doGetMessagesForUser(user.id);
        setChats(filterDisplayMessagesForSearchTerm(searchTerm.toLowerCase()));
      // }
      // catch(error) {
      //   console.error('Error fetching chat partners or messages: ', error);
      // }
    }
    (async () => {
      await updateViewData();
    })();

    }, [searchTerm, user]); 


return (
  <div className="message-list">
    {chats.map((msg, index) => {
      const chatPartnerID = msg.partnerId;
      const chatDate = msg.chatDate;
      const chatPreviewText = msg.chatText;
      const chatPartnerUsername = msg.partnerName;
      return (
        <ChatCard
          key={index}
          chatPartnerID={chatPartnerID}
          chatPartnerUsername={chatPartnerUsername}
          chatDate={chatDate}
          chatPreviewText={chatPreviewText}
          onClick={() => handleChatClick(chatPartnerID)}
        />
      );
    })}
  </div>
)};