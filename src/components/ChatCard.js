import { Fragment } from 'react';

export default function ChatCard({
  chatPartnerID,
  chatPartnerUsername,
  chatDate,
  chatPreviewText,
}) {
  // You might want to fetch more detailed chat data or perform other actions here
  async function getChatData() {
    // Fetch or compute chat data
  }

  return (
    <Fragment>
      <div className="chatCard" id={`chat-${chatSenderNo}-${chatReceiverNo}`}>
        <div className="chat-card-container">
          <section className="chat-card-body">
            <div className="chat-info">
              <p className="bold" id={`sender-${chatSenderNo}`}>
                {chatSenderNo}
              </p>
              <span className="chat-date" id={`date-${chatSenderNo}-${chatReceiverNo}`}>
                {chatDate}
              </span>
            </div>
            <div className="chat-preview">
              <p>{chatPreviewText}</p>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
}
