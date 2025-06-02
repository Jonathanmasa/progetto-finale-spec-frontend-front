import { useEffect, useState } from 'react';
import { getAllDestinations } from '../api/destinations';
import DestinationCard from "../components/DestinationCard";


export default function Favorities() {
  const [favorites, setFavorites] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const all = await getAllDestinations();
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      const favDestinations = all.filter(dest => favIds.includes(dest.id));
      setFavorites(favDestinations);
      setDestinations(all); // utile se vuoi aggiornare lo stato globale o per debug
    }
    fetchData();
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="container py-4">
        <h2>I tuoi preferiti ❤️</h2>
        <p>Non hai ancora aggiunto nessuna destinazione ai preferiti.</p>
      </div>
    );
  }

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
