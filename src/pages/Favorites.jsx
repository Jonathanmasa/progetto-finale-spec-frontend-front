// Importo gli hook di React e la funzione API per ottenere tutte le destinazioni
import { useEffect, useState } from 'react';
import { getAllDestinations } from '../api/destinations';
import DestinationCard from "../components/DestinationCard";

// Componente principale per mostrare le destinazioni preferite
export default function Favorities() {
  // Stato per salvare le destinazioni preferite
  const [favorites, setFavorites] = useState([]);

  // Stato per tutte le destinazioni, che al momento non viene usato ma può tornare utile
  const [destinations, setDestinations] = useState([]);

  // Alla prima renderizzazione, recupero i dati dal localStorage e dal backend
  useEffect(() => {
    async function fetchData() {
      const all = await getAllDestinations(); // Chiamo l'API per tutte le destinazioni
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]'); // Prendo gli ID preferiti dal localStorage
      const favDestinations = all.filter(dest => favIds.includes(dest.id)); // Filtro solo quelle corrispondenti
      setFavorites(favDestinations);
      setDestinations(all); // Non lo uso qui, ma lo tengo se servisse in futuro per confronti o debug
    }
    fetchData();
  }, []);

  // Se non ci sono preferiti, mostro un messaggio d'invito
  if (favorites.length === 0) {
    return (
      <div className="container py-4">
        <h2>I tuoi preferiti ❤️</h2>
        <p>Non hai ancora aggiunto nessuna destinazione ai preferiti.</p>
      </div>
    );
  }

  // Se ci sono preferiti, li mostro in griglia usando le card
  return (
    <div className="container py-4">
      <h2 className="mb-4">I tuoi preferiti ❤️</h2>
      <div className="row g-4">
        {favorites.map(dest => (
          <div key={dest.id} className="col-md-4">
            <DestinationCard destination={dest} />
          </div>
        ))}
      </div>
    </div>
  );
}
