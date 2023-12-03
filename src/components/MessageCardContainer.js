import React, { Fragment, useState, useEffect } from "react";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

//components import
import ChatCard from "./MessageCard";

export default function ChatContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const Message = Parse.Object.extend("Message");
      const query = new Parse.Query(Message);

      query.ascending("Message_Date");
      
      // Example: Fetch messages for a specific user
      query.equalTo(
        "Receiver_User_ID",
        Parse.Object.extend("_User").createWithoutData("YznbDiMrX1")
      );

      try {
        const results = await query.find();
        setMessages(results);
      } catch (error) {
        console.error("Error while fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <ChatCard
          key={index}
          messageSenderNo={message.get("Sender_User_ID").id}
          messageRecieverNo={message.get("Receiver_User_ID").id}
          messageDate={message.get("Message_Date").toLocaleString()}
          messageText={message.get("Message_Text")}
        />
      ))}
    </div>
  );
}
