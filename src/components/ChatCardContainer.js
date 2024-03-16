import React, { useState, Fragment } from "react";


// CSS import
import "../../src/styles.css";

//components import
import ChatCard from "./ChatCard";
import CloseButton from "../assets/IconCloseButton";

export default function ChatContainer({ messages, currentUserId }) {
  const [ selectedImage, setSelectedImage] = useState('');

  function getMessageDate(msg){
    let date = msg.date.toLocaleDateString([], {day:'numeric', month: 'numeric'});
    return date;
  };
  function getMessageTime(msg){
    let time = msg.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  };

  const renderModal = () => {
    if (!selectedImage) return null;

    return(
      <div className="modal-overlay">
        <div className="modal-content">
          <button 
            className="modal-close-button" 
            onClick={() => 
            setSelectedImage(null)}> <CloseButton/>
          </button>
  
        <div className="modal-image">
          {selectedImage && 
            <img 
            src={selectedImage} 
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
      {messages.map((message, index) => {
        console.log(message.image);
        return <ChatCard
          isShownRight={message.sender === currentUserId}
          onClick={() => setSelectedImage(message.image)}
          key={message.id || index}
          senderId={message.sender}
          recieverId={message.receiver}
          date={getMessageDate(message)}
          time={getMessageTime(message)}
          text={message.text}
          image={message.image}
        />
    })}
    </div>
    {renderModal()}
    </Fragment>
  );
}
