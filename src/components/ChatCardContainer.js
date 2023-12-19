import React, { useState, useEffect, Fragment } from "react";

// import stores
import useChatStore from "../stores/ChatStore";

// CSS import
import "../../src/styles.css";

//components import
import ChatCard from "./ChatCard";

export default function ChatContainer({ currentUserID, chatPartnerID }) {
  const { doGetMessagesForThread } = useChatStore();
  const [messages, setMessages] = useState([]);
  const [ selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      let tmpMessages = await doGetMessagesForThread(
        chatPartnerID,
        currentUserID
      );
      setMessages(tmpMessages);
    };
    fetchMessages();
  }, [currentUserID, chatPartnerID]);

  function getMessageDate(msg){
    let date = msg.get("Message_Date").toLocaleDateString();
    let dateList = date.split('/');
    let finalDate = dateList[0] + '/' + dateList[1];
    return finalDate;
  };
  function getMessageTime(msg){
    let time = msg.get("Message_Date").toLocaleTimeString();
    let timeList = time.split('.');
    let finalTime = timeList[0] + ':' + timeList[1];
    return finalTime;
  };

  const renderModal = () => {
    if (!selectedImage) return null;

    const imageFile = 
    selectedImage.get('Image') ? 
    selectedImage.get('Image').get('Image_File') : null;
    const image = imageFile ? imageFile.url() : null;

    return(
      <div className="modal-overlay">
        <div className="modal-content">
          <button 
            className="modal-close-button" 
            onClick={() => 
            setSelectedImage(null)}>x
          </button>
          <div className="modal-image">
          {image && 
            <img 
            src={image} 
            style={{ maxWidth: '40vh', height: 'auto' }}
            />
          }
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
    <div className="chat-container scrollbar-hidden">
      {messages.map((message, index) => (
        <ChatCard
          onClick={() => setSelectedImage(message)}
          key={index}
          messageSenderNo={message.get("Sender_User_ID").id}
          messageRecieverNo={message.get("Receiver_User_ID").id}
          messageDate={getMessageDate(message)}
          messageTime={getMessageTime(message)}
          messageText={message.get("Message_Text")}
          messageImagePointer={message.get("Image")}
        />
      ))}
    </div>
    {renderModal()}
    </Fragment>
  );
}
