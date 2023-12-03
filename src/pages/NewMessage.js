import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

// Components
import NewMessageCardContainer from "../components/NewMessageCardContainer";
import DockFilter from "../components/DockFilter";
import NavbarBottom from '../components/NavbarBottom';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function NewMessage() {
  //const dockNumbers = ["D1", "D2", "D3", "D4"];
  const [dockNumbers, setDockNumbers] = useState([]);
  //will store dock number and message text//
  const [selectedDock, setSelectedDock] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [dockNumberToUserIdMapping, setDockNumberToUserIdMapping] = useState({});

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
          console.log(`Dock: ${dock}, User ID: ${userId}`);
  
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

  // for when both dock number and message content are selected//
  const handleSendMessage = async () => {
    if (!selectedDock || !messageContent) {
      alert("Ensure a dock number has been selected or enter a message");
      return;
    }
  
    // mapping dock number to user id
    const receiverId = dockNumberToUserIdMapping[selectedDock];
    //const senderId = getCurrentUserId(); // **will be future task to put this fxn in 
    const senderId = 'YznbDiMrX1';

    if (!receiverId) {
      alert("Invalid dock number selected");
      return;
    }
  
    try {
      // making pointers for sender and receiver
      let senderPointer = Parse.Object.extend('_User').createWithoutData(senderId);
      let receiverPointer = Parse.Object.extend('_User').createWithoutData(receiverId);

      // new message object
      const Message = new Parse.Object("Message");
      Message.set('Message_Text', messageContent);
      Message.set('Sender_User_ID', senderPointer);
      Message.set('Receiver_User_ID', receiverPointer);
      // Current date and time as message date 
      Message.set('Message_Date', new Date());
  
      await Message.save();
  
      alert(`Message sent to ${selectedDock}!`);
      setMessageContent(""); 
    } catch (error) {
      console.error('Error while sending message:', error);
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
        onContentChange={handleMessageContentChange}
      />
      <div className="button-container">
        <div className="wrapper">
          <Link className="attach-button link" to={`/AttachPhoto`}>
            Attach Photo
          </Link>
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <NavbarBottom activeItem={"NewMessage"} />
    </Fragment>
  );
}
