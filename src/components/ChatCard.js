import { Fragment } from "react";

import useUserStore from "../stores/UserStore";

export default function ChatCard({
  messageSenderNo,
  messageRecieverNo,
  messageDate,
  messageTime,
  messageText,
  messageImagePointer,
  onClick,
}) {
  const { user } = useUserStore();

  const imageUrl = messageImagePointer
    ? messageImagePointer.get("Image_File").url()
    : null;

  function sortData() {
    let sortedData = [];
    if (messageSenderNo === user.id) {
      sortedData.push(
        <Fragment>
          <div
            className="chat-card chats right"
            id={messageSenderNo + messageRecieverNo}
          >
            <div className="chat-card-body">
              <div className="meta-text">
                <p style={{padding: '0%'}}>{messageText}</p>
              </div>
              {imageUrl && (
                <img
                  onClick={onClick}
                  src={imageUrl}
                  alt="Message Attachment"
                  className="message-image"
                />
              )}
            </div>
            <div className="chat-date"  style={{ marginRight: '2%' }}>
            <span>
                <h5>
                  {messageDate} <br />
                  {messageTime}
                </h5>
              </span>
            </div>
          </div>
        </Fragment>
      );
    }
    if (messageSenderNo !== user.id) {
      sortedData.push(
        <Fragment>
          <div
            className="chat-card chats"
            id={messageSenderNo + messageRecieverNo}
          >
            <div className="chat-card-body">
              <div className="meta-text">
                <p>{messageText}</p>
              </div>
              {/* for rendering the image if there is one */}
              {imageUrl && (
                <img
                  onClick={onClick}
                  src={imageUrl}
                  alt="Message Attachment"
                  className="message-image"
                />
              )}
            </div>
            <div className="chat-date"  style={{ marginRight: '2%' }}>
              <span>
                <h5>
                  {messageDate} <br />
                  {messageTime}
                </h5>
              </span>
            </div>
          </div>
        </Fragment>
      );
    }
    return sortedData;
  }

  return sortData();
}
