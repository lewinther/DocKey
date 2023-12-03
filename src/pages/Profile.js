import { Fragment } from "react";

// CSS import
import "../../src/styles.css";

//components import
import UserInfo from "../components/UserInfo";
import NavbarBottom from '../components/NavbarBottom';

export default function Profile({ userName }) {
  return (
    <Fragment>
      <div className="container-container">
        <h1>Welcome {userName}</h1>
        <h2 className="bold">Contact information</h2>
        <UserInfo />
        <h2 className="bold">Privacy settings</h2>
      </div>
      <NavbarBottom activeItem={"Profile"} />
    </Fragment>
  );
}
