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
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    fetchData();
    updateCompareCount();
  }, [search, category]);

  function updateCompareCount() {
    const compare = JSON.parse(localStorage.getItem('compare') || '[]');
    setCompareCount(compare.length);
  }

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

  function handleAddToCompare(id) {
    let current = JSON.parse(localStorage.getItem('compare') || '[]');

    if (current.includes(id)) {
      current = current.filter(i => i !== id);
    } else {
      if (current.length >= 2) {
        alert("Puoi confrontare solo 2 destinazioni per volta");
        return;
      }
      current.push(id);
    }

    localStorage.setItem('compare', JSON.stringify(current));
    setCompareCount(current.length);
  }

  function getSortedDestinations() {
    const sorted = [...destinations];
    switch (sort) {
      case 'title-asc': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc': sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'category-asc': sorted.sort((a, b) => a.category.localeCompare(b.category)); break;
      case 'category-desc': sorted.sort((a, b) => b.category.localeCompare(a.category)); break;
      default: break;
    }
    return sorted;
  }

  const sortedDestinations = getSortedDestinations();

  return (
    <div className="container home-container_py-2">
      <h2 className="home-title">Esplora Destinazioni</h2>

      <a href="/compare" className="home-compare-btn btn btn-warning">
        Vai al confronto ({compareCount})
      </a>

      <div className="home-filters">
        <input
          type="text"
          className="form-control home-input"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select home-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="form-select home-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Ordina per...</option>
          <option value="title-asc">Titolo (A-Z)</option>
          <option value="title-desc">Titolo (Z-A)</option>
          <option value="category-asc">Categoria (A-Z)</option>
          <option value="category-desc">Categoria (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <p className="home-loading">Caricamento in corso...</p>
      ) : sortedDestinations.length === 0 ? (
        <p className="home-no-results">Nessuna destinazione trovata.</p>
      ) : (
        <div className="home-row">
          {sortedDestinations.map(dest => (
            <DestinationCardWrapper
              key={dest.id}
              destination={dest}
              onCompare={handleAddToCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DestinationCardWrapper({ destination, onCompare }) {
  const compareSelected = JSON.parse(localStorage.getItem('compare') || '[]').includes(destination.id);
  return (
    <div className="destination-card-root position-relative">
      <DestinationCard
        destination={destination}
        onCompare={onCompare}
        compareSelected={compareSelected}
      />
    </div>
  );
}
