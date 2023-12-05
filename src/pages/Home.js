import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Stores
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";
import MessageCardContainer from "../components/ChatListHome";
import NavbarBottom from '../components/NavbarBottom';
import PageHeader from "../components/PageHeader";

export default function Home() {
	const user = useUserStore((state) => state.user);

  return (
    <Fragment>
      <PageHeader/>

      <div className="in-column">
        {user && (
          <h1>Welcome, {user.get('first_name')}!</h1>
        )}
        <NewsCardContainer />
        {user && (
          <div>
            <MessageCardContainer />
            <div className="centered">
              <Link Button className="BlueButton link" to={`/NewMessage`}>
                {" "}
                Send new message{" "}
              </Link>
            </div>
          </div>
        )}
        <NavbarBottom activeItem={"Home"} />
      </div>
    </Fragment>
  );
}

