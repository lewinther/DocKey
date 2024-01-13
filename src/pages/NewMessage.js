import { Fragment, useEffect, useRef, useState } from "react";
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
import NewMessageCardContainer from "../components/ChatCardCreateNewLarge";
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

  const [selectedDock, setSelectedDock] = useState("");
  const [messageContent, setMessageContent] = useState("");
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

  // event object passed in by the browser when the user selects a file
  //  event.target.files contains the list of files selected by the user
  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      // Create a preview URL for the image
      // web API method that creates a temporary URL
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
    let _messageContent = messageContent;
    setMessageContent("");
    await handleSendMessage(selectedDock, _messageContent, user);
     // Reset message content after sending

    // Navigate to chat page after message is sent
    const receiverId = dockNumberToUserIdMapping[selectedDock];
    if (receiverId) {
        navigate(`/Chat`, { state: { chatPartnerID: receiverId, userId: user.id } });
    } else {
        return("Invalid dock number or mapping not found for selectedDock:", selectedDock);
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