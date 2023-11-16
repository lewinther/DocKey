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

//Components import
import NavbarBottom from './components/NavbarBottom';


// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'l3GQPvwNSbOEWclaYe7G7zfmdh2lQP2kHquXOGbJ';
const PARSE_JAVASCRIPT_KEY = 'h9PTAAitCJFul7XadjhQbXFaK1N8VGZdJodYl5Tx';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


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