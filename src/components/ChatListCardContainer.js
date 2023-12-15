import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

//import stores
import useUserStore from "../stores/UserStore";
import useChatStore from "../stores/ChatStore";

//Import components
import ChatCard from "./ChatListCard";


//CSS import
import "../../src/styles.css";

export default function ChatListInbox({ searchTerm }) {
  const [chats, setChats] = useState([]);
  // Hook for programmatically navigating
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {doGetLatestMessageInEachUniqueThread, filterLatestMessageInThreadsBySearchTerm} = useChatStore();
  // Function to handle chat card click
  const { markMessageAsRead } = useChatStore();

  const handleChatClick = async (chatPartnerID, messageId) => {
      await markMessageAsRead(messageId);
      // Navigate to the chat view
      const userId = user.id;
      navigate(`/Chat`, { state: { chatPartnerID, userId } });
  };


  useEffect(() => {
    if(!user) return;
    async function updateViewData() {
      // try {
        await doGetLatestMessageInEachUniqueThread(user.id);
        setChats(filterLatestMessageInThreadsBySearchTerm(searchTerm.toLowerCase()));
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
  <div className="message-list scrollbar-hidden">
    {chats.map((msg, index) => {
      const chatPartnerID = msg.partnerId;
      const chatDate = msg.chatDate;
      const chatPreviewText = msg.chatText.length > 35 ? `${msg.chatText.substring(0, 35)}...` : msg.chatText;
      const chatPartnerUsername = msg.partnerName;
      const chatUnreadMessages = msg.unread;
      const chatPartnerIsSender = msg.isSender;
      const chatMessageId = msg.messageId;
      const chatPartnerProfileImage = msg.profileImage;

      return (
        <ChatCard
          key={index}
          chatPartnerID={chatPartnerID}
          chatPartnerUsername={chatPartnerUsername}
          chatDate={chatDate}
          chatPartnerImg={chatPartnerProfileImage}
          chatPreviewText={chatPreviewText}
          // if msg.isSender is False and chatUnreadMessages is True, then the message is unread and chatTextStyle is bold else chatTextStyle is empty
          chatTextStyle={chatPartnerIsSender ? "" : chatUnreadMessages ? "bold" : ""}
          onClick={() => handleChatClick(chatPartnerID, chatMessageId)}
        />
      );
    })}
  </div>
)};