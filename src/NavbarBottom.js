import React, { useState } from 'react';
import './NavbarBottom.css';
import IconHome from './svg/IconHome';
import IconInbox from './svg/IconInbox';
import IconNewm from './svg/IconNewm';
import IconProfile from './svg/IconProfile';

function NavbarBottom() {
    const [activeItem, setActiveItem] = useState("Home"); 

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        alert("You clicked " + itemName + "! Action has to be defined")
    };

    return (
        <div className="navbar-bottom">
            <div className={`nav-item ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => handleItemClick("Home")}>
                <IconHome className="icon" />
                <p>Home</p>
            </div>
            <div className={`nav-item ${activeItem === 'Inbox' ? 'active' : ''}`} onClick={() => handleItemClick("Inbox")}>
                <IconInbox className="icon" />
                <p>Inbox</p>
            </div>
            <div className={`nav-item ${activeItem === 'News' ? 'active' : ''}`} onClick={() => handleItemClick("News")}>
                <IconNewm className="icon" />
                <p>New</p>
            </div>
            <div className={`nav-item ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleItemClick("Profile")}>
                <IconProfile className="icon" />
                <p>Profile</p>
            </div>
        </div>
    );
}

export default NavbarBottom;
