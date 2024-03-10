import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

//import stores
import useChatStore from "../stores/ChatStore";
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

// Components
import ChatContainer from "../components/ChatCardContainer";
import NavbarBottom from "../components/NavbarBottom";
import ChatCardCreate from "../components/ChatCardCreateNew";

export default function Chat() {
  const { user } = useUserStore();
  const {fetchChatPartnerProfile, doGetMessagesForThread, handleSendMessage, setImageFile, imageFile} = useChatStore();
  // Hook to access the current location object
  const location = useLocation();
  // Retrieve the user ID and chat partner ID from the navigation state
  const { chatPartnerID } = location.state || {};
  const [ chatPartner, setChatPartner ] = useState("");
  const [ messages, setMessages] = useState(undefined);

  const [messageText, setMessageContent] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!chatPartnerID) return;
    async function updateViewData(){
      setChatPartner(await fetchChatPartnerProfile(chatPartnerID));
      let tmpMessages = await doGetMessagesForThread(
              chatPartnerID,
              user.id
      );
      console.log(tmpMessages);
      setMessages(tmpMessages);
    }
    (async () => {
      await updateViewData();
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
    await handleSendMessage(user.id, chatPartnerID, messageText);
    setMessageContent(""); // Reset message content after sending
  };

  function refresh(){
    window.location.reload("Refresh")
  }

  async function clickOnSendMessage(){
      await onSendMessage();
      if (onSendMessage){
        refresh();
      }
  };

  if(user) {
    return (
      <Fragment>
          {chatPartner && (
          <h1>Conversation with {chatPartner.userDockNumber}</h1>
        )}
          <ChatContainer messages={messages} currentUserId={user.id} />
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
