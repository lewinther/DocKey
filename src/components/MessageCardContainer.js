import React, { useState, useEffect } from "react";

//stores
import useChatStore from '../stores/ChatStore';

// CSS import
import "../../src/styles.css";

//components import
import ChatCard from "./MessageCard";

export default function ChatContainer({ currentUserID, chatPartnerID }) {
  const {doGetMessagesForThread} = useChatStore();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      let tmpMessages = await doGetMessagesForThread(chatPartnerID, currentUserID);
      setMessages(tmpMessages);
    };

    fetchMessages();
  }, [currentUserID, chatPartnerID]);

  return (
    <div 
    className="chat-container">
      {messages.map((message, index) => (
        <ChatCard
          key={index}
          messageSenderNo={message.get("Sender_User_ID").id}
          messageRecieverNo={message.get("Receiver_User_ID").id}
          messageDate={message.get("Message_Date").toLocaleString()}
          messageText={message.get("Message_Text")}
          messageImagePointer={message.get("Image")}
        />
      ))}
    </div>
  );
}


