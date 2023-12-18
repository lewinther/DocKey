import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, useState } from "react";

// CSS import
import "./App.css";
import "./styles.css";

// Pages import
import Home from "./pages/Home";
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";

// Components import
import NavbarBottom from "./components/NavbarBottom";
import DockFilter from "./components/DockFilter";

export default function App() {
  const dockNumbers = ["D1", "D2", "D3", "D4"];
  const handleDockSelection = (selectedDockNumber) => {
    return(`Selected dock number: ${selectedDockNumber}`);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Inbox" element={<MyInbox />} />
          <Route path="NewMessage" element={<NewMessage />} />
        </Routes>
        <DockFilter
          onDockSelect={handleDockSelection}
          dockNumbers={dockNumbers}
        />
        <NavbarBottom />
      </BrowserRouter>
    </>
  );
}
