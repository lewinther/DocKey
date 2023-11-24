import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

// CSS import
import "../../src/styles.css";

// Components
import ChatContainer from "../components/ChatContainer";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ";
const PARSE_JAVASCRIPT_KEY = "h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// DUMMY for current user id
const currentUserId = "YznbDiMrX1";

export default function Chat() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const User = Parse.Object.extend("_User");
    const user = new Parse.Query(User);

    user
      .get(currentUserId)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        alert(
          `Failed to retrieve the object, with error code: ${error.message}`
        );
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div>
        <div className="container-container">
        <ChatContainer />
        <Link Button className="BlueButton link" to={`/NewMessage`}>
          {" "}
          Send new message{" "}
        </Link>
        </div>
      </div>
    </Fragment>
  );
}
