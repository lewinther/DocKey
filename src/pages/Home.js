// fragment
import { Fragment } from "react";

//Stores
// global state and setter functions
import useUserStore from "../stores/UserStore";
// zustand: global state stores 
// that can be accessed from anywhere in the application.

// useState: local state store within a component
// ideal for simple and component-specific states

// CSS import
import "../../src/styles.css";

// Components
import NewsCardContainer from "../components/NewsCardContainer";
import ChatListInbox from "../components/ChatListCardContainer";
import NavbarBottom from '../components/NavbarBottom';
import UserLogin from "../components/UserLogIn";

export default function Home() {
  // useUserStore returns user from Zustand store
	const user = useUserStore((state) => state.user);

  return (
    <Fragment>
      
		  { // Conditional rendering, if user is undefined, show login page
        user === undefined && (
        <UserLogin/>
		  )} 
      <div className="in-column height-100-percent">
        { // Conditional rendering, if user is defined, show home page
          user && (
            <>
            <h1>Welcome, {user.get('first_name')}! </h1>
            <NewsCardContainer />
            <div className='wrapper'>
              <h3 className='h3-home'> Your Messages </h3>
            </div>
            <ChatListInbox searchTerm={""} activePage={"Home"} />
            <NavbarBottom activeItem={"Home"} />
            </>
          )
        }
      </div>
    </Fragment>
  );
}

