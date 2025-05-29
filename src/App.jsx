import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import './App.css'; 

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations/:id" element={<Detail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}