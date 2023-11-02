import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS import
import './App.css';
import './styles.css'

//Pages import
import Home from './pages/Home';
import MyInbox from "./pages/MyInbox";
import NewMessage from "./pages/NewMessage";

export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Inbox" element={<MyInbox />} />
          <Route path="NewMessage" element={<NewMessage />} />
        </Routes>
    </BrowserRouter>
  );
}