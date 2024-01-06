import { Fragment, useEffect, useRef, useState } from "react";
// necessary to access the state passed from navigation
import { useLocation } from "react-router-dom";
import Parse from "parse";
import { getUserName } from "../parse/parseHelper";

//import stores
import useUserStore from "../stores/UserStore";
import useNewMessageStore from "../stores/NewMessageStore";

// CSS import
import "../../src/styles.css";

// Components
import ChatContainer from "../components/ChatCardContainer";
import NavbarBottom from "../components/NavbarBottom";
import ChatCardCreate from "../components/ChatCardCreateNew";

// Your Parse initialization configuration
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Chat() {
  const { user } = useUserStore();
  // Hook to access the current location object
  const { handleSendMessage_Lena, setImageFile, imageFile } = useNewMessageStore();
  const location = useLocation();
  // Retrieve the user ID and chat partner ID from the navigation state
  const { chatPartnerID } = location.state || {};
  const [ userName, setUserName ] = useState("");
  
  const [messageText, setMessageContent] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!chatPartnerID) return;
    async function updateUserName(){
      setUserName(await getUserName(chatPartnerID));
    }
    (async () => {
      await updateUserName();
    })();
  }, [chatPartnerID]);

  function handleMessageContentChange(content){
    setMessageContent(content);
  };

  function handleAttachClick() {
    fileInputRef.current.click();
  };

  function handleImageChange(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageFile({ file, previewUrl });
      event.target.value = null;
    }
  };

  function onDeleteImage() {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  async function onSendMessage() {
    await handleSendMessage_Lena(user.id, chatPartnerID, messageText);
    setMessageContent(""); // Reset message content after sending
  };

  // refresh page
  function refresh(){
    window.location.reload("Refresh")
  }

  // click on send button to send message and refresh page
  async function clickOnSendMessage(){
      await onSendMessage();
      if (onSendMessage){
        refresh();
      }
  };

  if(user) {
    return (
      <Fragment>
          {userName && (
          <h1>Conversation with {userName}</h1>
        )}
          <ChatContainer chatPartnerID={chatPartnerID} currentUserID={user.id} />
          <div className="ChatCardNew-chat">
            <ChatCardCreate
              messageText={messageText}
              imagePreview={imageFile ? imageFile.previewUrl : null}
              onContentChange={handleMessageContentChange}
              onDeleteImage={onDeleteImage}
              onSendMessage={clickOnSendMessage}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{display:'none'}}
            />
            <div className="button-container">
              <div className="wrapper" style={{paddingTop: '1vh'}}>
                <button className="attach-button" onClick={handleAttachClick}>
                  Attach Photo
                </button>
                <button className="send-button" onClick={clickOnSendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        <NavbarBottom activeItem={"Inbox"} />
      </Fragment>
    );
  }
    
  else return;
}
