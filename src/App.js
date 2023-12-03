import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parse from 'parse';

// CSS import
import './App.css';
import './styles.css';
import './styles.css'

//Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";

//Components import
import NavbarBottom from './components/NavbarBottom';
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
        }else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Home /> : <LogIn/>} />
        <Route path="Inbox" element={<MyInbox />} />
        <Route path="NewMessage" element={<NewMessage />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}