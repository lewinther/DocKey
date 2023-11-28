import { Fragment } from "react";

// CSS import
import "../../src/styles.css";

//Components import
import SearchBar from "../components/SearchBar";
import ChatListInbox from "../components/ChatListInbox";
import NavbarBottom from '../components/NavbarBottom';

export default function MyInbox() {
  return (
    <Fragment>
      <div className="in-column">
      <SearchBar />
      <ChatListInbox/>
      <NavbarBottom activeItem={"Inbox"} />
      </div>
    </Fragment>
  );
}
