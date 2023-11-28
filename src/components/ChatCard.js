import { Fragment } from 'react';

export default function ChatCard({
  chatPartnerID,
  chatPartnerUsername,
  chatDate,
  chatPreviewText,
}) {
  return (
    <Fragment>
        <div className="message-card-container" id={`chat-${chatPartnerID}`}>
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
