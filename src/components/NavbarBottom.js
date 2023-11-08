import React, { useState } from 'react';
import { Fragment } from "react";
import IconHome from '../assets/IconHome';
import IconInbox from '../assets/IconInbox';
import IconNewm from '../assets/IconNewm';
import IconProfile from '../assets/IconProfile';
import { Link } from "react-router-dom";


function NavbarBottom() {
    // defines which item is active on the navbar 
    const [activeItem, setActiveItem] = useState("Home"); // has to be aligned with the pages

    // handles the click on a navbar item
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <Fragment>
        <div className="navbar-bottom">
            <Link className="link" to={`/`}>
              <div className={`nav-item ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => handleItemClick("Home")}>
                  <IconHome className="icon" />
                  <p>Home</p>
              </div>
            </Link>
            <Link className="link" to={`/Inbox`}>
              <div className={`nav-item ${activeItem === 'Inbox' ? 'active' : ''}`} onClick={() => handleItemClick("Inbox")}>
                  <IconInbox className="icon" />
                  <p>Inbox</p>
              </div>
            </Link>
            <Link className="link" to={`/NewMessage`}>
              <div className={`nav-item ${activeItem === 'Newm' ? 'active' : ''}`} onClick={() => handleItemClick("Newm")}>
                  <IconNewm className="icon" />
                  <p>New</p>
              </div>
            </Link>
            <Link className="link" to={`/Profile`}>
              <div className={`nav-item ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleItemClick("Profile")}>
                  <IconProfile className="icon" />
                  <p>Profile</p>
              </div>
            </Link>
        </div>
        </Fragment>
    );
}

export default NavbarBottom;
