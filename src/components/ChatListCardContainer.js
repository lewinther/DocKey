import React, { useEffect, useState } from 'react';
// useNavigate: hook to navigate to a different page
// in scenarios where navigation needs to occur as a result of some action, 
// such as after a form submission, in response to an API call, or inside an event handler.
import { useNavigate } from "react-router-dom";

//import stores
import useUserStore from "../stores/UserStore";
import useChatStore from "../stores/ChatStore";

//Import components
import ChatCard from "./ChatListCard";

//CSS import
import "../../src/styles.css";

export default function ChatListInbox({ searchTerm, activePage }) {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {doGetLatestMessageInEachUniqueThread, filterLatestMessageInThreadsBySearchTerm} = useChatStore();
  // Function to handle chat card click
  const { markMessagesAsRead } = useChatStore();
  // Determine the CSS class based on the activePage
  const chatListCSS = activePage === "Home" ? "message-list-small" : "message-list";

  // when a chat card is clicked, mark all messages in the chat as read
  const handleChatClick = async (chatPartnerID, userID) => {
      await markMessagesAsRead(chatPartnerID, userID);
      // Navigate to the chat view
      const userId = user.id;
      // navigate to the chat view and pass the chatPartnerID and userId as state
      navigate(`/Chat`, { state: { chatPartnerID, userId } });

  };

  // useEffect to fetch the latest message in each unique thread
  // and filter the threads by the search term
  useEffect(() => {
    if(!user) return;
    async function updateViewData() {
      try {
        await doGetLatestMessageInEachUniqueThread(user.id);
        setChats(filterLatestMessageInThreadsBySearchTerm(searchTerm.toLowerCase()));
      }
      catch(error) {
        console.error('Error fetching chat partners or messages: ', error);
      }
    }
    (async () => {
      await updateViewData();
    })();

    }, [searchTerm, user]); 

// returns the chat list
return (
  <div className={chatListCSS + " scrollbar-hidden"}>
    {chats.map((msg, index) => {
      const chatPartnerID = msg.partnerId;
      const chatDate = msg.chatDate;
      const chatPreviewText = msg.chatText.length > 60 ? `${msg.chatText.substring(0, 60)}...` : msg.chatText;
      const chatPartnerUsername = msg.partnerName;
      const chatUnreadMessages = msg.unread;
      const chatPartnerIsSender = msg.isSender;
      const chatMessageId = msg.messageId;
      const chatPartnerProfileImage = msg.profileImage;
      const chatUnreadMessagesCount = msg.unreadMessagesCount;
      const userID = msg.userId;

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
          onClick={() => handleChatClick(chatPartnerID, userID)}
          chatUnreadMessages={chatPartnerIsSender ? "" : chatUnreadMessages ? true : false}
          chatCountUnreadMessages={chatUnreadMessagesCount}
          userID={userID}
        />
      );
    })}
  </div>
)};