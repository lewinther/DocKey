import { Fragment, useState, useEffect, useRef } from "react";
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
  const {user} = useUserStore();
  const [dockNumbers, setDockNumbers] = useState([]);
  //will store dock number and message text//
  const [selectedDock, setSelectedDock] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [dockNumberToUserIdMapping, setDockNumberToUserIdMapping] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchDockNumbers = async () => {
      const User = Parse.Object.extend("_User");
      const query = new Parse.Query(User);
  
      try {
        const results = await query.find();
        const docks = [];
        const dockToUserId = {};
  
        for (const user of results) {
          const dock = user.get('dock');
          const userId = user.id;  
          if (dock) {
            docks.push(dock);
            dockToUserId[dock] = userId;
          }
        }
  
        setDockNumbers(docks);
        setDockNumberToUserIdMapping(dockToUserId);
      } catch (error) {
        console.error('Error while fetching dock numbers', error);
      }
    };
  
    fetchDockNumbers();
  }, []);

    //update selected dock state when user selects a dock//
    const handleDockSelection = (selectedDockNumber) => {
      console.log(`Selected dock number: ${selectedDockNumber}`);
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
        setImageFile({ file, previewUrl }); // stores the File object and the preview URL
        event.target.value = null;
      }
    };
    
    

    const onDeleteImage = () => {
      setImageFile(null); // removes image preview and file
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // resets the input file value - needed for refresh
      }
    };

    // for when both dock number and message content are selected//
    const handleSendMessage = async () => {
      if (!selectedDock || !messageContent) {
        alert("Ensure a dock number has been selected or enter a message");
        return;
      }
    
      // mapping dock number to user id
      const receiverId = dockNumberToUserIdMapping[selectedDock];
      const senderId = user.id;
    
      if (!receiverId) {
        alert("Invalid dock number selected");
        return;
      }

      let parseFile;
      let ImageObject;
    
      try {
        if (imageFile && imageFile.file) {
          
          parseFile = new Parse.File(imageFile.file.name, imageFile.file);
          await parseFile.save();
    
          // adding image to image table in parse db
          ImageObject = new Parse.Object("Image");
          ImageObject.set('Image_File', parseFile);
          await ImageObject.save();
        }
        
        // making pointers for sender and receiver
        let senderPointer = Parse.Object.extend('_User').createWithoutData(senderId);
        let receiverPointer = Parse.Object.extend('_User').createWithoutData(receiverId);
    
        // new message object
        const Message = new Parse.Object("Message");
        Message.set(_messageFields.text, messageContent);
        Message.set(_messageFields.senderId, senderPointer);
        Message.set(_messageFields.receiverId, receiverPointer);       
        // Current date and time as message date 
        Message.set(_messageFields.date, new Date());

         // if there is an image, add it to the Message object
        if (ImageObject) {
          Message.set('Image', ImageObject); // creates an image pointer to the file in the image table 
        }
    
        await Message.save();

        setMessageContent(""); 
        setImageFile(null); // reset the image file state after sending
    
      } catch (error) {
        console.error('Error while sending message or uploading image:', error);
        alert(`Failed to send message: ${error.message}`);
      }    
    };
    
  

  return (
    <Fragment>
      <h1>New Message</h1>
      <DockFilter
        onDockSelect={handleDockSelection}
        dockNumbers={dockNumbers}
      />
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
        style={{ display: 'none' }} // hiding input element to use attach photo btn
      />
      <div className="button-container">
        <div className="wrapper">
          <button className="attach-button" onClick={handleAttachClick}>
            Attach Photo
          </button>
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <NavbarBottom activeItem={"NewMessage"} />
    </Fragment>
  );
}
