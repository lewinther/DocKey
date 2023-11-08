import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

// CSS import
import './App.css';
import './styles.css';
import './styles.css'

//Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";
import Profile from "./pages/Profile";

//Components import
import NavbarBottom from './components/NavbarBottom';

export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Inbox" element={<MyInbox />} />
        <Route path="NewMessage" element={<NewMessage />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    <NavbarBottom />
    </BrowserRouter>
   </>
  );
}