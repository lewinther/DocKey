import { Fragment } from "react";

export default function NewMessageCardContainer({
  messageContent,
  imagePreview,
  onContentChange,
  onDeleteImage
}) {
  //takes current value of text area and updates parent//
  const handleMessageChange = (event) => {
    onContentChange(event.target.value);
  };

  return (
    //handle message change calls oncontentchange and updates parent//
    <Fragment>
      <section className="new-message-container">
        <textarea 
        onChange={handleMessageChange} 
        value={messageContent} 
        placeholder="Type in your message here...">
        </textarea> 
        {imagePreview && (
          <div className="image-preview-wrapper">
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} /> 
            </div>
            <button className="delete-image-button" onClick={onDeleteImage}>Delete</button>
          </div>
        )}

      </section>
    </Fragment>
  );
}
