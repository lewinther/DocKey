import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS import
import './App.css';
import './styles.css'

//Pages import
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <section className="body">
        <Routes>
          <Route index element={<Home />}>
          </Route>
        </Routes>
      </section>
    </BrowserRouter>
  );
}