import React, { Fragment } from "react";

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
        {user && (
        <NewsCardContainer />
        )}
        {user && (
            <MessageCardContainer />
        )}
        {user && (
        <NavbarBottom activeItem={"Home"} />
        )}
      </div>
    </Fragment>
  );
}

