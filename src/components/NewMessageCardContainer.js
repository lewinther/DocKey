import { Fragment } from "react";

export default function NewMessageCardContainer({
  messageContent,
  onContentChange,
}) {
  //takes current value of text area and updates parent//
  const handleMessageChange = (event) => {
    onContentChange(event.target.value);
  };

  return (
    //handle message change calls oncontentchange and updates parent//
    <Fragment>
      <section className="new-message-container">
        <textarea onChange={handleMessageChange} value={messageContent} placeholder="Type in your message here..."></textarea> 
      </section>
    </Fragment>
  );
}
