import { Fragment } from "react";

export default function ChatCardCreateNew({
  messageText,
  imagePreview,
  onContentChange,
  onDeleteImage,
  onSendMessage,
}) {
  //takes current value of text area and updates parent//
  const handleMessageChange = (event) => {
    onContentChange(event.target.value);
  };

  return (
    <Fragment>
      <section className="new-message-container-small">
        <textarea
          onChange={handleMessageChange}
          value={messageText}
          placeholder="Type in your message here..."
        ></textarea>
        {imagePreview && (
          <div className="image-preview-wrapper">
            <div
              className="image-preview-container in-line"
              style={{ alignSelf: "center" }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "10vh", height: "auto" }}
              />

              <button 
              className="delete-image-button" 
              onClick={onDeleteImage}
              style={{ maxHeight: '6vh'}}
              >
                Delete
              </button>
              <button
                className="delete-image-button"
                style={{ backgroundColor: "#1D385C", maxHeight: '6vh'}}
                onClick={onSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
}
