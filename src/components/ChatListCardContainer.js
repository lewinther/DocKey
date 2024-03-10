import React from 'react';

//Import components
import ChatCard from "./ChatListCard";

//CSS import
import "../../src/styles.css";

export default function ChatListInbox({ 
  chats, 
  compact, 
  user, 
  navigateToChat, 
  countUnreadMessagesForThread,
  getChatPartnerProfileById
}) {
  const chatListCSS = compact ? "message-list-small" : "message-list";
  const getChatPartnerProfile = async (chatPartnerID) => {
    return await getChatPartnerProfileById(chatPartnerID);
  }
return (
  <div className={chatListCSS + " scrollbar-hidden"}>
    {chats.map((thread, index) => {
      const chatPartnerID = thread.chatPartner;
      const msg = thread.messages;
      const chatDate = msg.date;
      let chatPreviewText = '';
      if(msg.text)
        chatPreviewText = msg.text.length > 60 ? `${msg.text.substring(0, 60)}...` : msg.text;
      const chatPartnerIsSender = msg.sender === chatPartnerID;
      const chatUnreadMessagesCount = countUnreadMessagesForThread(chatPartnerID);
      const chatUnreadMessages = chatUnreadMessagesCount > 0;

      const chatPartnerProfile = getChatPartnerProfile(chatPartnerID);

      return (
        <ChatCard
          key={index}
          chatPartnerID={chatPartnerID}
          chatPartnerUsername={chatPartnerProfile.username}
          chatDate={chatDate}
          chatPartnerImg={chatPartnerProfile.image}
          chatPreviewText={chatPreviewText}
          // if msg.isSender is False and chatUnreadMessages is True, then the message is unread and chatTextStyle is bold else chatTextStyle is empty
          chatTextStyle={chatPartnerIsSender ? "" : chatUnreadMessages ? "bold" : ""}
          onClick={() => navigateToChat(chatPartnerID, user.id)}
          chatUnreadMessages={chatPartnerIsSender ? "" : chatUnreadMessages ? true : false}
          chatCountUnreadMessages={chatUnreadMessagesCount}
          userID={user.id}
        />
      );
    })}
  </div>
)};