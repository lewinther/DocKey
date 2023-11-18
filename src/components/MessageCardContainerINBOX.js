import { Fragment } from "react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Parse from 'parse';

// CSS import
import "../../src/styles.css";
import MessageCard from "./MessageCard";

export default function MessageCardContainerINBOX() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const Message = Parse.Object.extend('Message');
      const query = new Parse.Query(Message);

      // Example: Fetch messages for a specific user
      query.equalTo('Receiver_User_ID', Parse.Object.extend('_User').createWithoutData('YznbDiMrX1'));

      try {
        const results = await query.find();
        setMessages(results);
      } catch (error) {
        console.error('Error while fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);


  return (
    <div>
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          messageSenderNo={message.get('Sender_User_ID').id}
          messageRecieverNo={message.get('Receiver_User_ID').id}
          messageDate={message.get('Message_Date').toLocaleString()}
          messageText={message.get('Message_Text')}
        />
      ))}
    </div>
  );
};
