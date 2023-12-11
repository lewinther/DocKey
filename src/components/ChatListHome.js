import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

//css import
import "../../src/styles.css";

//components import
import ChatListInbox from './ChatListCardContainer';

export default function ChatListHome() {

return (
     <Fragment>
      <div className='wrapper'>
        <h3 className='h3-home'> Your Messages </h3>
        <Link Button className="new-message-button link" to={`/NewMessage`}>
            Send New Message
        </Link>
      </div>
      <ChatListInbox searchTerm={""}/>
     
      </Fragment>
  )
};