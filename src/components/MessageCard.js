import { Fragment } from "react";

import useUserStore from "../stores/UserStore";

export default function ChatCard({
  messageSenderNo,
  messageRecieverNo,
  messageDate,
  messageText,
  messageImagePointer,
}) {
  const {user} = useUserStore();

  async function getMessageData() {}
  const imageUrl = messageImagePointer
    ? messageImagePointer.get("Image_File").url()
    : null;


  return (
    <Fragment>
      <div
        className="chat-card chats"
        id={messageSenderNo + messageRecieverNo}
      >
        <section className="chat-card-body">
          <div className="in-line-message">
            <p className="bold" id="messageSender">
              {"Sender: " + messageSenderNo + " Receiver: " + messageRecieverNo}
            </p>
            <h5 id="messageDate">{messageDate}</h5>
          </div>
          <div className="meta-text">
            <p>{messageText}</p>
            {/* for rendering the image if there is one */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Message Attachment"
                className="message-image"
              />
            )}
          </div>
        </section>
      </div>
    </Fragment>
  );
  
}
