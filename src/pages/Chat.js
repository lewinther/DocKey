import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

// Components
import ChatContainer from "../components/MessageCardContainer";
import NavbarBottom from "../components/NavbarBottom";

// Your Parse initialization configuration
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Chat() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Hook to access the current location object

  // Retrieve the user ID and chat partner ID from the navigation state
  const { currentUser, chatPartnerID } = location.state || {};

  useEffect(() => {
    if (currentUser) {
      const User = Parse.Object.extend("_User");
      const userQuery = new Parse.Query(User);

      userQuery
        .get(currentUser)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          alert(`Failed to retrieve the object, with error code: ${error.message}`);
        });
    }
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div>
        <div className="container-container">
          <ChatContainer chatPartnerID={chatPartnerID} currentUserID={currentUser} />
          <Link className="BlueButton link" to={`/NewMessage`}>
            Send new message
          </Link>
        </div>
      </div>
      <NavbarBottom activeItem={"Inbox"} />
    </Fragment>
  );
}
