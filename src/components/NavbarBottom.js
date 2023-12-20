import { Fragment } from "react";
import IconHome from "../assets/IconHome";
import IconInbox from "../assets/IconInbox";
import IconNewMessage from "../assets/IconNewMessage";
import IconProfile from "../assets/IconProfile";
import { Link } from "react-router-dom";

function NavbarBottom({ activeItem }) {

  return (
    <Fragment>
      <div className="navbar-bottom">
        <Link className="link" to={`/`}>
          <div
            className={`nav-item ${activeItem === "Home" ? "active" : ""}`}
          >
            <IconHome className="icon" />
            <p>Home</p>
          </div>
        </Link>
        <Link className="link" to={`/Inbox`}>
          <div
            className={`nav-item ${activeItem === "Inbox" ? "active" : ""}`}
          >
            <IconInbox className="icon" />
            <p>Inbox</p>
          </div>
        </Link>
        <Link className="link" to={`/NewMessage`}>
          <div
            className={`nav-item ${activeItem === "NewMessage" ? "active" : ""}`}
          >
            <IconNewMessage className="icon" />
            <p>New</p>
          </div>
        </Link>
        <Link className="link" to={`/Profile`}>
          <div
            className={`nav-item ${activeItem === "Profile" ? "active" : ""}`}
          >
            <IconProfile className="icon" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
    </Fragment>
  );
}

export default NavbarBottom;
