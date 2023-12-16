import React, { Fragment } from "react";

//Stores
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";
import ChatListInbox from "../components/ChatListCardContainer";
import NavbarBottom from '../components/NavbarBottom';
import PageHeader from "../components/PageHeader";

export default function Home() {
	const user = useUserStore((state) => state.user);

  return (
    <Fragment>
      <PageHeader/>

      <div className="in-column">
        {user && (
          <>
          <h1>Welcome, {user.get('first_name')}! </h1>
          <NewsCardContainer />
          <div className='wrapper'>
            <h3 className='h3-home'> Your Messages </h3>
          </div>
          <ChatListInbox searchTerm={""} activePage={"Home"} />
          <NavbarBottom activeItem={"Home"} />
          </>
        )}
      </div>
    </Fragment>
  );
}

