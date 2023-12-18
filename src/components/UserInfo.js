import { Fragment } from "react";
import Parse from "parse";

//import stores
import useUserStore from "../stores/UserStore";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export default function UserInfo() {
  const { user } = useUserStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <section className="in-column user-container" >
        <p className="in-line">Name: {user.get('first_name') + " " + user.get('last_name')}</p>
        <p className="in-line">Phone: {user.get('phone_no')}</p>
        <p className="in-line">E-mail: {user.get('email')}</p>
      </section>
    </Fragment>
  );
}
