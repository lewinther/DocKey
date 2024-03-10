import { Fragment } from "react";


export default function ChatCard({
  isShownRight,
  senderId,
  recieverId,
  date,
  time,
  text,
  image,
  onClick,
}) {
  let cardAlignment = '';
  if(isShownRight) cardAlignment = 'chat-card chats right';
  else cardAlignment = 'chat-card chats';
  return (
    <Fragment>
      <div
        className={cardAlignment}
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
  );
}
