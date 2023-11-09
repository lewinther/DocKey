import { Fragment } from "react";

export default function MessageCard({
  messageSenderNo,
  messageRecieverNo,
  messageDate,
  messageTime,
  messageText,
}) {
  async function getMessageData() {}

  return (
    <Fragment>
      <div className="messageCard" id={messageRecieverNo + messageRecieverNo}>
        <div className="in-line-message">
          <section className="message-card-body">
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
      </div>
    </Fragment>
  );
}
