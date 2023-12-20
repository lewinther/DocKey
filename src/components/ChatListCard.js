import { Fragment } from 'react';

export default function ChatCard({
  chatPartnerID,
  chatPartnerUsername,
  chatPartnerImg,
  chatDate,
  chatPreviewText,
  onClick,
  chatUnreadMessages,
  chatCountUnreadMessages,
  userID
}) {
  return (
    <Fragment>
      <div className="message-card-container" id={`chat-${chatPartnerID}`} onClick={onClick}>
        <div className="in-line">
          <section className="message-card-body">
            <div className="in-line">
              {chatPartnerImg && (
                <div className='profile-img-container'>
                  <img
                    className="news-card-img height-45-px"
                    src={chatPartnerImg}
                    alt={chatPartnerUsername + " image"}
                  />
                </div>
              )}
              {!chatPartnerImg && (
                <div className='profile-img-container'>
                  <div className='square'>
                    <div className='profile-img-alt-font'>{chatPartnerUsername}</div>
                  </div>
                </div>
              )}
              <div className="width-75">
                <div className="in-line chatlist-card-title">
                  <div className="chatlist-card-username bold" id={`username-${chatPartnerID}`}>{chatPartnerUsername}</div>
                  <div className="chatlist-card-date" id={`newsDate date-${chatPartnerID}`}>{chatDate}</div>
                </div>
                <div className="in-line">
                  <div className={`chatlist-card-preview ${chatUnreadMessages ? 'bold' : ''}`}>{chatPreviewText}</div>
                  {chatUnreadMessages && (
                    <div className="chatlist-card-unread-count">
                      {chatCountUnreadMessages}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
}
