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
            <textarea
            onChange={handleMessageChange}
            value={messageText}
            placeholder="Type in your message here...">
            </textarea>
            {imagePreview && (
                <div className="image-preview-wrapper">
                    <div className="image-preview-container">
                        <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ maxWidth: '5vh', height: 'auto' }}
                        /> 
                        <button 
                        className="delete-image-button" 
                        onClick={onDeleteImage}>
                            Delete
                        </button>
                    </div>

                </div>
            )}
        </section>
    </Fragment>
  )
}