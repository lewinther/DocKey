import { useState, Fragment } from "react";

// CSS import
import "../../src/styles.css";

//Components import
import SearchBar from "../components/SearchBar";
import ChatListInbox from "../components/ChatListCardContainer";
import NavbarBottom from '../components/NavbarBottom';

export default function MyInbox() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Fragment>
      <div className="in-column height-100-percent">
        <h1>Inbox</h1>
        <SearchBar onSearch={handleSearch} />
        <ChatListInbox searchTerm={searchTerm} activePage={"Inbox"} />
        <NavbarBottom activeItem={"Inbox"} />
      </div>
    </Fragment>
  );
}
