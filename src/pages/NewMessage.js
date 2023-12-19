import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import {
    //parse DB fields
  _sender_user_id, 
  _receiver_user_id,
  _username,
  _messageFields,
} from "../parse/parseHelper";

// stores
import useUserStore from "../stores/UserStore";
import useNewMessageStore from '../stores/NewMessageStore';

// CSS import
import "../../src/styles.css";

// Components
import NewMessageCardContainer from "../components/ChatCardNew";
import DockFilter from "../components/DockFilter";
import NavbarBottom from '../components/NavbarBottom';

// Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export default function NewMessage() {
  const { user } = useUserStore();
  const {
    dockNumbers,
    fetchAndSetDockNumbers,
    handleSendMessage,
    dockNumberToUserIdMapping,
    setImageFile,
    imageFile
  } = useNewMessageStore();

  const [selectedDock, setSelectedDock] = React.useState("");
  const [messageContent, setMessageContent] = React.useState("");
  const fileInputRef = useRef(null);
  // Hook for programmatically navigating
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
    fetchAndSetDockNumbers(user.id);
    }
  }, [user]);

  const handleDockSelection = (selectedDockNumber) => {
    setSelectedDock(selectedDockNumber);
  };

  const handleMessageContentChange = (content) => {
    setMessageContent(content);
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageFile({ file, previewUrl });
      event.target.value = null;
    }
  };

  const onDeleteImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const onSendMessage = async () => {
    await handleSendMessage(selectedDock, messageContent, user);
    setMessageContent(""); // Reset message content after sending

    const receiverId = dockNumberToUserIdMapping[selectedDock];
    if (receiverId) {
        navigate(`/Chat`, { state: { chatPartnerID: receiverId, userId: user.id } });
    } else {
        console.error("Invalid dock number or mapping not found for selectedDock:", selectedDock);
        // Handle the error case appropriately
    }
};

  return (
    <Fragment>
      <h1>New Message</h1>
      <DockFilter onDockSelect={handleDockSelection} dockNumbers={dockNumbers} />
      <NewMessageCardContainer
        messageContent={messageContent}
        imagePreview={imageFile ? imageFile.previewUrl : null}
        onContentChange={handleMessageContentChange}
        onDeleteImage={onDeleteImage}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <div className="button-container">
        <div className="wrapper">
          <button className="attach-button" onClick={handleAttachClick}>
            Attach Photo
          </button>
          <button className="send-button" onClick={onSendMessage}>
            Send
          </button>
        </div>
      </div>
      <NavbarBottom activeItem={"NewMessage"} />
      </Fragment>
  );
}