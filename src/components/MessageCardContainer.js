import React, { useState, useEffect } from "react";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

//components import
import ChatCard from "./MessageCard";

export default function ChatContainer({ currentUserID, chatPartnerID }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log("currentUserID: "+currentUserID);
      console.log("ChatPartnerID: "+chatPartnerID);

      let received = await GetAllMessageByFieldId('Receiver_User_ID', currentUserID);
      received = received.filter(
        (x) => x.get("Sender_User_ID").id == chatPartnerID);

      let sent = await GetAllMessageByFieldId('Sender_User_ID', currentUserID);
      sent = sent.filter((x) => x.get("Receiver_User_ID").id == chatPartnerID);
      let tmpMessages = [...received, ...sent];
      tmpMessages = tmpMessages.sort((a,b) => a.get("Message_Date") - b.get("Message_Date"));
      setMessages(tmpMessages);
    };

    fetchMessages();
  }, [currentUserID, chatPartnerID]);

  return (
    <div className="chat-container">
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


async function GetAllMessageByFieldId(fieldId, userId) {
  const Message = Parse.Object.extend("Message");
  const query = new Parse.Query(Message);

  query.ascending("Message_Date");
  query.include("Image");
  
  // Example: Fetch messages for a specific user
  query.equalTo(
    fieldId,
    Parse.Object.extend("_User").createWithoutData(userId)
  );

  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error("Error while fetching messages:", error);
  }
}