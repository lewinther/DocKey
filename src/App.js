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
import UserLogin from "./components/UserLogIn";

// Components import
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Inbox" element={<MyInbox />} />
          <Route path="/NewMessage" element={<NewMessage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
