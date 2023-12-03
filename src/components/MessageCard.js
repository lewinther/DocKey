import { Fragment } from "react";

export default function ChatCard({
  messageSenderNo,
  messageRecieverNo,
  messageDate,
  messageTime,
  messageText,
}) {
  async function getMessageData() {}

  return (
    <Fragment>
      <div className="chat-card chats" id={messageRecieverNo + messageRecieverNo}>
          <section className="chat-card-body">
            <div className="in-line-message">
              <p className="bold" id="messageSender">
                {messageSenderNo}
              </p>
              <h5 id="messageDate">{messageDate}</h5>
            </div>
            <div className="meta-text">
              <p>{messageText}</p>
            </div>
          </section>
      </div>
    </Fragment>
  );
}
