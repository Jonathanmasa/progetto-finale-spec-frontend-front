import { useEffect, useState } from 'react';
import { getAllDestinations } from '../api/destinations';
import DestinationCard from '../components/DestinationCard';

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
    
  }, [search, category]);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getAllDestinations({ search, category });
      setDestinations(data);

      
      const uniqueCategories = Array.from(new Set(data.map(dest => dest.category))).sort();
      setCategories(uniqueCategories);

    } catch (err) {
      console.error('Errore nel caricamento destinazioni:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Esplora Destinazioni</h2>

      <div className="d-flex gap-3 my-4">
        <input
          className="form-control"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : destinations.length === 0 ? (
        <p>Nessuna destinazione trovata.</p>
      ) : (
        <div className="row">
          {destinations.map(dest => (
            <div className="col-md-4 mb-4" key={dest.id}>
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}