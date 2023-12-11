import { Fragment } from "react";

import useUserStore from "../stores/UserStore";

export default function ChatCard({
  messageSenderNo,
  messageRecieverNo,
  messageDate,
  messageText,
  messageImagePointer,
}) {
  const { user } = useUserStore();

  const imageUrl = messageImagePointer
    ? messageImagePointer.get("Image_File").url()
    : null;

  function sortData(){
    let sortedData=[];
  if (messageSenderNo===user.id){
  sortedData.push(
    <Fragment>
      <div className="chat-card chats right" id={messageSenderNo + messageRecieverNo}>
        <div className="chat-card-body">
          <div className="metaText">
            <p>{messageText}</p>
          </div>
          {/* for rendering the image if there is one */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Message Attachment"
              className="message-image"
            />
          )}
        </div>
        <div className="meta-text chat-date">
          <h5>{messageDate}</h5>
          </div>
      </div> 
    </Fragment>
  );
  }
  if (messageSenderNo!==user.id){
    sortedData.push (
      <Fragment>
        <div className="chat-card chats" id={messageSenderNo + messageRecieverNo}>
          <div className="chat-card-body">
            <div className="metaText">
              <p>{messageText}</p>
            </div>
            {/* for rendering the image if there is one */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Message Attachment"
                className="message-image"
              />
            )}
          </div>
          <div className="meta-text chat-date">
            <h5>{messageDate}</h5>
            </div>
        </div> 
      </Fragment>
    );
    }
    return sortedData;
  }

  return sortData();

}
