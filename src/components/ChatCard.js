import { Fragment } from "react";


export default function ChatCard({
  currentUserId,
  senderId,
  recieverId,
  date,
  time,
  text,
  image,
  onClick,
}) {

  function sortData() {
    let sortedData = [];
      sortedData.push(createChatCardBody(senderId === currentUserId));
    return sortedData;
  }

  const createChatCardBody = (isShownLeft) => {
     const cardAlignment = isShownLeft ? "chat-card chats" : "chat-card chats right";
      <Fragment>
        <div
          className={{cardAlignment}}
          id={senderId + recieverId}
        >
          <div className="chat-card-body">
            <div className="meta-text">
              <p style={{padding: '0%'}}>{text}</p>
            </div>
            {image && (
              <img
                onClick={onClick}
                src={image}
                alt="Message Attachment"
                className="message-image"
              />
            )}
          </div>
          <div className="chat-date"  style={{ marginRight: '2%' }}>
          <span>
              <h5>
                {date} <br />
                {time}
              </h5>
            </span>
          </div>
        </div>
      </Fragment>
  }

  return sortData();
}
