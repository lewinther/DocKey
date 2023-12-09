import React, { useState, Fragment } from "react";

// CSS import
import "../../src/styles.css";

//Components import
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ChatListInbox from "../components/ChatListInbox";
import NavbarBottom from '../components/NavbarBottom';

export default function MyInbox() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Fragment>
      <PageHeader/>
      <div className="in-column">
        <h1>Inbox</h1>
        <SearchBar onSearch={handleSearch} />
        <ChatListInbox searchTerm={searchTerm} />
        <NavbarBottom activeItem={"Inbox"} />
      </div>
    </Fragment>
  );
}
