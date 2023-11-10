import { Fragment } from "react";

import InputMessage from "./InputMessage";

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
      <section className="new-message-container in-column">
        <textarea onChange={handleMessageChange} value={messageContent} />
      </section>
    </Fragment>
  );
}
