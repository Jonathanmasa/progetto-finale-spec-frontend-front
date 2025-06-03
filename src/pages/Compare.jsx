import { useEffect, useState } from 'react';
import { getDestinationById } from '../api/destinations';

// Componente principale per il confronto di due destinazioni
export default function Compare() {
  // Stato per contenere le destinazioni da confrontare
  const [items, setItems] = useState([]);
  // Stato per gestire il caricamento dei dati
  const [loading, setLoading] = useState(true);

  // Hook useEffect per recuperare le destinazioni da confrontare dal localStorage
  useEffect(() => {
    const compareIds = JSON.parse(localStorage.getItem('compare') || '[]');

    // Se non ci sono esattamente due destinazioni, mostro un alert e fermo il caricamento
    if (compareIds.length !== 2) {
      alert("Seleziona 2 destinazioni per il confronto.");
      setLoading(false);
      return;
    }

    // Funzione asincrona per recuperare i dati delle due destinazioni
    async function fetchData() {
      setLoading(true);
      try {
        // Recupero i dati per entrambe le destinazioni in parallelo
        const data = await Promise.all(compareIds.map(async id => {
          const res = await getDestinationById(id);
          return res.destination; // Estraggo solo l'oggetto destinazione
        }));
        setItems(data); // Salvo i dati nello stato
      } catch (err) {
        console.error("Errore nel caricamento dei dati per il confronto", err);
      } finally {
        setLoading(false); // Fine caricamento in ogni caso
      }
    }

    fetchData();
  }, []); // Solo al primo montaggio

  // Funzione per svuotare il confronto e ricaricare la pagina
  function clearCompare() {
    localStorage.removeItem('compare');
    window.location.reload();
  }

  // Se i dati sono ancora in caricamento
  if (loading) return <p className="compare-status compare-loading">Caricamento dati...</p>;

  // Se non ci sono abbastanza destinazioni per il confronto
  if (items.length < 2) return <p className="compare-status compare-warning">Servono 2 destinazioni per fare il confronto.</p>;

  // Estraggo le due destinazioni da confrontare
  const [a, b] = items;

  return (
    <div className="compare-container container py-5">
      {/* Titolo della pagina */}
      <h2 className="compare-title mb-5 text-center">Confronto Destinazioni</h2>

      {/* Bottone per svuotare il confronto */}
      <div className="text-center mb-4">
        <button className="btn btn-danger btn-lg compare-clear-btn" onClick={clearCompare}>
          Svuota confronto
        </button>
      </div>

      {/* Visualizzazione affiancata delle due destinazioni */}
      <div className="row compare-row g-4">
        {[a, b].map((dest) => (
          <div key={dest.id} className="col-md-6 compare-card bg-white p-4 rounded shadow-sm border-0">
            {/* Immagine della destinazione */}
            <div className="compare-image-wrapper mb-4">
              <img
                src={`http://localhost:3001/images/${dest.image}`}
                alt={dest.title}
                className="compare-image img-fluid rounded"
              />
            </div>

            {/* Titolo della destinazione */}
            <h3 className="compare-title-dest fw-bold mb-3">{dest.title}</h3>

            {/* Informazioni sulla destinazione */}
            <p><strong>Categoria:</strong> <span className="text-primary">{dest.category}</span></p>
            <p><strong>Paese:</strong> {dest.country}</p>
            <p><strong>Costo medio:</strong> <span className="text-success">€{dest.averageCost}</span></p>
            <p><strong>Miglior stagione:</strong> {dest.bestSeason}</p>
            <p><strong>Clima:</strong> {dest.climate}</p>
            <p><strong>Ore di volo:</strong> {dest.flightHours}</p>

            {/* Lista delle attrazioni */}
            <p><strong>Attrazioni:</strong></p>
            <div className="compare-attractions-list">
              {dest.attractions && dest.attractions.map((attr, i) => (
                <span key={i} className="badge bg-info text-dark me-2 mb-2 shadow-sm compare-attraction-badge">
                  {attr}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
