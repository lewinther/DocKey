import { Fragment } from "react";
// SVG icons
import IconHome from "../assets/IconHome";
import IconInbox from "../assets/IconInbox";
import IconNewMessage from "../assets/IconNewMessage";
import IconProfile from "../assets/IconProfile";
// Link component: used to navigate between pages
// react-router-dom: library handles routing in React
import { Link } from "react-router-dom";

// Navbar takes one prop: activeItem
// activeItem is a string that determines which icon is active and highlighted
function NavbarBottom({ activeItem }) {

  // 4 icons, each with a link to a different page
  // dynamic class name: 
  // if activeItem/prop is equal to the icon's name, 
  // add "active" class
  // active class: highlight icon in dark blue

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
