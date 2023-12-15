import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

//css import
import "../../src/styles.css";

//components import
import ChatListInbox from './ChatListCardContainer';

export default function ChatListHome() {

return (
  <Fragment>
    <ChatListInbox searchTerm={""}/>
  </Fragment>
  )
};