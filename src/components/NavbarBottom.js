import React, { useState } from 'react';
import IconHome from '../assets/IconHome';
import IconInbox from '../assets/IconInbox';
import IconNewm from '../assets/IconNewm';
import IconProfile from '../assets/IconProfile';

function NavbarBottom() {
    // defines which item is active on the navbar 
    const [activeItem, setActiveItem] = useState("Home"); // has to be aligned with the pages

    // handles the click on a navbar item
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        alert("You clicked " + itemName + "! Action has to be defined") // TODO: define action
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
