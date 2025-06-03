// Importo gli hook necessari da React per gestire stato ed effetti
import { useEffect, useState } from 'react';
// Importo la funzione che recupera tutte le destinazioni dall'API
import { getAllDestinations } from '../api/destinations';
// Importo il componente che mostra ogni singola destinazione
import DestinationCard from '../components/DestinationCard';

export default function Home() {
  // Stato per contenere l'elenco delle destinazioni
  const [destinations, setDestinations] = useState([]);
  // Stato per gestire il testo di ricerca
  const [search, setSearch] = useState('');
  // Stato per il filtro per categoria
  const [category, setCategory] = useState('');
  // Stato per l'ordinamento
  const [sort, setSort] = useState('');
  // Stato per mostrare un indicatore di caricamento
  const [loading, setLoading] = useState(true);
  // Stato che contiene l'elenco delle categorie disponibili (derivate dai dati)
  const [categories, setCategories] = useState([]);
  // Stato per contare quante destinazioni sono selezionate per il confronto
  const [compareCount, setCompareCount] = useState(0);
  // Stato per decidere se mostrare solo i preferiti
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // useEffect che richiama il fetch dei dati ogni volta che cambia il filtro di ricerca o la categoria
  useEffect(() => {
    fetchData();            // Carico le destinazioni
    updateCompareCount();   // Aggiorno il contatore dei confronti
  }, [search, category]);

  // Funzione che aggiorna il numero di destinazioni selezionate per il confronto
  function updateCompareCount() {
    const compare = JSON.parse(localStorage.getItem('compare') || '[]');
    setCompareCount(compare.length);
  }

  // Funzione asincrona che recupera i dati delle destinazioni dal backend
  async function fetchData() {
    setLoading(true);
    try {
      // Faccio la chiamata API con i filtri attivi
      const data = await getAllDestinations({ search, category });
      setDestinations(data);

      // Ricavo le categorie uniche dai dati ricevuti, le ordino e le salvo nello stato
      const uniqueCategories = Array.from(new Set(data.map(dest => dest.category))).sort();
      setCategories(uniqueCategories);
    } catch (err) {
      // In caso di errore lo loggo in console
      console.error('Errore nel caricamento destinazioni:', err);
    } finally {
      // In ogni caso nascondo il caricamento
      setLoading(false);
    }
  }

  // Funzione per aggiungere o rimuovere una destinazione dal confronto
  function handleAddToCompare(id) {
    let current = JSON.parse(localStorage.getItem('compare') || '[]');

    if (current.includes(id)) {
      // Se è già presente, la rimuovo
      current = current.filter(i => i !== id);
    } else {
      // Se ci sono già 2 destinazioni selezionate, blocco l'aggiunta
      if (current.length >= 2) {
        alert("Puoi confrontare solo 2 destinazioni per volta");
        return;
      }
      // Altrimenti la aggiungo
      current.push(id);
    }

    // Aggiorno il localStorage e il contatore visivo
    localStorage.setItem('compare', JSON.stringify(current));
    setCompareCount(current.length);
  }

  // Funzione che restituisce l'elenco ordinato e filtrato delle destinazioni
  function getSortedDestinations() {
    const sorted = [...destinations];
    
    // Ordinamento in base alla selezione dell'utente
    switch (sort) {
      case 'title-asc': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc': sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'category-asc': sorted.sort((a, b) => a.category.localeCompare(b.category)); break;
      case 'category-desc': sorted.sort((a, b) => b.category.localeCompare(a.category)); break;
      default: break;
    }

    // Se è attivo il filtro "solo preferiti", filtro ulteriormente i dati
    if (showFavoritesOnly) {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      return sorted.filter(dest => favIds.includes(dest.id));
    }

    return sorted;
  }

  // Calcolo le destinazioni da mostrare in base a ordinamento e filtri attivi
  const sortedDestinations = getSortedDestinations();

  return (
    <div className="container home-container_py-2">
      {/* Titolo della pagina */}
      <h2 className="home-title">Esplora Destinazioni</h2>

      {/* Pulsante per accedere alla pagina di confronto */}
      <a href="/compare" className="home-compare-btn btn btn-warning">
        Vai al confronto ({compareCount})
      </a>

      {/* Sezione dei filtri (ricerca, categoria, ordinamento, solo preferiti) */}
      <div className="home-filters d-flex flex-wrap gap-2 align-items-center my-3">
        {/* Campo di ricerca */}
        <input
          type="text"
          className="form-control home-input"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Filtro per categoria */}
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

        {/* Ordinamento */}
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

        {/* Checkbox per mostrare solo le destinazioni preferite */}
        <label className="form-check-label d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={showFavoritesOnly}
            onChange={() => setShowFavoritesOnly(prev => !prev)}
          />
          Solo preferiti
        </label>
      </div>

      {/* Visualizzazione risultati o messaggi */}
      {loading ? (
        <p className="home-loading">Caricamento in corso...</p>
      ) : sortedDestinations.length === 0 ? (
        <p className="home-no-results">Nessuna destinazione trovata.</p>
      ) : (
        <div className="home-row">
          {/* Ciclo e mostro le destinazioni tramite un wrapper personalizzato */}
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

// Wrapper per la scheda destinazione, che gestisce se è selezionata per il confronto
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
