import { Fragment } from "react";

// CSS import
import "../../src/styles.css";

//Components import
import SearchBar from "../components/SearchBar";
import ChatListInbox from "../components/ChatListInbox";

export default function MyInbox() {
  return (
    <Fragment>
      <div className="centered">
        <SearchBar />
      </div>
      <ChatListInbox/>
    </Fragment>
  );
}
