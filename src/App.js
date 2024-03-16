import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useUserStore from "./stores/UserStore";

// CSS import
import './App.css';
import './styles.css';

// Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";
import Profile from "./pages/Profile";
import UserLogin from "./components/UserLogIn";

// Components import
import Chat from "./pages/Chat";

export default function App() {
  const {user, doRestoreSession} = useUserStore();
  	useEffect(() => {
      async function onMounted() {
        console.log('hello from app js');
        if(!user) {
          await doRestoreSession();
        } 
      }
      (async () => {
          await onMounted();
      })();
	}, [])

  return (
    <>
      {user === undefined && (
			  <UserLogin/>
		  )} 
      {user && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Inbox" element={<MyInbox />} />
            <Route path="/NewMessage" element={<NewMessage />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
