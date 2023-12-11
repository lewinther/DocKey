import { Fragment } from 'react';

export default function ChatCard({
  chatPartnerID,
  chatPartnerUsername,
  chatDate,
  chatPreviewText,
  onClick, // Add this line to include the onClick prop
}) {
  return (
    <Fragment>
      <div className="message-card-container" id={`chat-${chatPartnerID}`} onClick={onClick}>
        {/* The rest of your ChatCard contents */}
        <div className="card">
          <div className="in-line">
            <section className="message-card-body">
              <div className="in-line">
                <p className="bold" id={`newsTitle username-${chatPartnerID}`}>{chatPartnerUsername}</p>
                <h5 id={`newsDate date-${chatPartnerID}`}>{chatDate}</h5>
              </div>
              <div className="meta-text">
                <p>{chatPreviewText}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
