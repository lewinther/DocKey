import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Parse from 'parse';

// CSS import
import './App.css';
import './styles.css';

// Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";
import Profile from "./pages/Profile";
import UserLogin from "./pages/LogIn";

// Components import
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";

export default function App() {
  
  // Checking the authentication status
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const currentUser = Parse.User.current();
        if (currentUser) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuthentication();
  }, []);

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <>
    {authenticated && (
      <h3 onClick={() => doUserLogOut()} className="h3-home">Log out</h3>
    )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={authenticated ? <Navigate to="/Home" /> : <UserLogin />}/>
          <Route path="/Home" element={<Home />} />
          <Route path="/Inbox" element={<MyInbox />} />
          <Route path="/NewMessage" element={<NewMessage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
