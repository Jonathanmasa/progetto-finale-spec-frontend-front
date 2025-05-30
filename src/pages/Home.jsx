import { useEffect, useState } from 'react';
import { getAllDestinations } from '../api/destinations';
import DestinationCard from '../components/DestinationCard';

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
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

  function getSortedDestinations() {
    const sorted = [...destinations];

    switch (sort) {
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'category-asc':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'category-desc':
        sorted.sort((a, b) => b.category.localeCompare(a.category));
        break;
      default:
        break;
    }

    return sorted;
  }

  const sortedDestinations = getSortedDestinations();

  return (
    <div className="container py-2">
      <h2>Esplora Destinazioni</h2>

      <div className="d-flex gap-3 my-4 flex-wrap">
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

        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Ordina per...</option>
          <option value="title-asc">Titolo (A-Z)</option>
          <option value="title-desc">Titolo (Z-A)</option>
          <option value="category-asc">Categoria (A-Z)</option>
          <option value="category-desc">Categoria (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : sortedDestinations.length === 0 ? (
        <p>Nessuna destinazione trovata.</p>
      ) : (
        <div className="row">
          {sortedDestinations.map(dest => (
            <div className="col-md-4 mb-4" key={dest.id}>
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
