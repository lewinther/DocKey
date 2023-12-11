import { Fragment } from "react";

export default function ChatCardCreateNew({
    messageText,
    imagePreview,
    onContentChange,
    onDeleteImage,
}) {

  //takes current value of text area and updates parent//
  const handleMessageChange = (event) => {
    onContentChange(event.target.value);
  };
  

  return(
    <Fragment>
        <section className="new-message-container-small">
            
        </section>
    </Fragment>
  )
}