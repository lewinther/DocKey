import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, createContext, useEffect, useState } from "react";

// CSS import
import './App.css';
import './styles.css';
import './styles.css'

//Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";

//Components import
import NavbarBottom from './components/NavbarBottom';
import SearchBar from './components/SearchBar';


export const NewsContext = createContext<undefined>(
  undefined
)

export default function App() {

  return (
    <>
    <h1>Welcome Flemming</h1>
    <SearchBar />
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Inbox" element={<MyInbox />} />
        <Route path="NewMessage" element={<NewMessage />} />
      </Routes>
    </BrowserRouter><Fragment>
    <NavbarBottom />
    </Fragment></>
  );
}