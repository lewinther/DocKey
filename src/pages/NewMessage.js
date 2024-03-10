import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// stores
import useUserStore from "../stores/UserStore";
import useChatStore from '../stores/ChatStore';

// CSS import
import "../../src/styles.css";

// Components
import NewMessageCardContainer from "../components/ChatCardNew";
import DockFilter from "../components/DockFilter";
import NavbarBottom from '../components/NavbarBottom';

export default function NewMessage() {
  
  const { user } = useUserStore();

  const {
    chatPartners,
    fetchPotentialChatPartners,
    handleSendMessage,
    setImageFile,
    imageFile
  } = useChatStore();

  const [usernames, setUsernames] = useState([]);
  const [selectedDock, setSelectedDock] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) return;
    async function updateViewData(){
      await fetchPotentialChatPartners(user.id);
      let partners = chatPartners.filter(x => {
        if(x.userId !== user.id) return x;
      })
      partners = partners.map(x => x.username);
      setUsernames(partners);
    }
    (async () => {
      await updateViewData();
    })();
  }, []);

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
    setMessageContent("");

    const receiverId = selectedDock.userId;
    if (receiverId) {
        navigate(`/Chat`, { state: { chatPartnerID: receiverId, userId: user.id } });
    } else {
        return("Invalid dock number or mapping not found for selectedDock:", selectedDock);
    }
};

  return (
    <Fragment>
      <h1>New Message</h1>
      <DockFilter onDockSelect={setSelectedDock} usernames={usernames} />
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