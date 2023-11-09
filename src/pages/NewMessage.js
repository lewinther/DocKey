import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// CSS import
import "../../src/styles.css";

// Components
import NewMessageCardContainer from "../components/NewMessageCardContainer";
import DockFilter from "../components/DockFilter";

export default function NewMessage() {
  const dockNumbers = ["D1", "D2", "D3", "D4"];
  //will store dock number and message text//
  const [selectedDock, setSelectedDock] = useState("");
  const [messageContent, setMessageContent] = useState("");

  //update selected dock state when user selects a dock//
  const handleDockSelection = (selectedDockNumber) => {
    console.log(`Selected dock number: ${selectedDockNumber}`);
    setSelectedDock(selectedDockNumber);
  };

  const handleMessageContentChange = (content) => {
    setMessageContent(content);
  };

  //actions when send button clicked - ensure both dock no and message content exist//
  const handleSendMessage = () => {
    if (!selectedDock || !messageContent) {
      alert("Ensure a dock number has been selected");
      return;
    }
    //reset form after sending//
    setMessageContent("");
    alert(`Message sent to ${selectedDock}!`);
  };

  return (
    <Fragment>
      <h1>New Message</h1>
      <h3>Which dock do you want to contact?</h3>
      <DockFilter
        onDockSelect={handleDockSelection}
        dockNumbers={dockNumbers}
      />
      <h3>Your Message:</h3>
      <NewMessageCardContainer
        messageContent={messageContent}
        onContentChange={handleMessageContentChange}
      />
      <div className="button-container">
        <div className="button-group">
          <Link className="WhiteButton link" to={`/AttachPhoto`}>
            Attach Photo
          </Link>
          <button className="BlueButton" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </Fragment>
  );
}
