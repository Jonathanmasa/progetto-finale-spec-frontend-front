// Importo i componenti principali di React Router per gestire la navigazione tra le pagine
import { Routes, Route } from 'react-router-dom';

// Importo le pagine principali del sito: Home, Detail, Compare e Favorites
import Home from './pages/Home';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';

// Importo il componente NavBar che rimane fisso in alto su ogni pagina
import NavBar from './components/NavBar';

// Importo lo stile globale dell'app (per ora contenuto in App.css)
import './App.css'; 

// Questo è il componente principale della mia app
export default function App() {
  return (
    <div>
      {/* Inserisco la barra di navigazione visibile in tutte le pagine */}
      <NavBar />

      {/* Definisco le route dell'app: ogni path corrisponde a una pagina */}
      <Routes>
        {/* Home page visibile all'accesso del sito ("/") */}
        <Route path="/" element={<Home />} />

        {/* Pagina di dettaglio, che visualizza una destinazione specifica basata sull'ID */}
        <Route path="/destinations/:id" element={<Detail />} />

        {/* Pagina per confrontare più destinazioni */}
        <Route path="/compare" element={<Compare />} />

        {/* Pagina dove visualizzo le destinazioni salvate tra i preferiti */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}
