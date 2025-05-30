import { useEffect, useState } from 'react';
import { getDestinationById } from '../api/destinations';

export default function Compare() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const compareIds = JSON.parse(localStorage.getItem('compare') || '[]');
    if (compareIds.length !== 2) {
      alert("Seleziona 2 destinazioni per il confronto.");
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      try {
        const data = await Promise.all(compareIds.map(async id => {
          const res = await getDestinationById(id);
          return res.destination;  // prendo solo la destinazione
        }));
        setItems(data);
      } catch (err) {
        console.error("Errore nel caricamento dei dati per il confronto", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function clearCompare() {
    localStorage.removeItem('compare');
    window.location.reload();
  }

  if (loading) return <p className="compare-status compare-loading">Caricamento dati...</p>;
if (items.length < 2) return <p className="compare-status compare-warning">Servono 2 destinazioni per fare il confronto.</p>;


  const [a, b] = items;

  return (
    <div className="compare-container container py-5">
  <h2 className="compare-title mb-5 text-center">Confronto Destinazioni</h2>
  <div className="text-center mb-4">
    <button className="btn btn-danger btn-lg compare-clear-btn" onClick={clearCompare}>
      Svuota confronto
    </button>
  </div>

  <div className="row compare-row g-4">
    {[a, b].map((dest) => (
      <div key={dest.id} className="col-md-6 compare-card bg-white p-4 rounded shadow-sm border-0">
        <div className="compare-image-wrapper mb-4">
          <img
            src={`http://localhost:3001/images/${dest.image}`}
            alt={dest.title}
            className="compare-image img-fluid rounded"
          />
        </div>
        <h3 className="compare-title-dest fw-bold mb-3">{dest.title}</h3>
        <p><strong>Categoria:</strong> <span className="text-primary">{dest.category}</span></p>
        <p><strong>Paese:</strong> {dest.country}</p>
        <p><strong>Costo medio:</strong> <span className="text-success">€{dest.averageCost}</span></p>
        <p><strong>Miglior stagione:</strong> {dest.bestSeason}</p>
        <p><strong>Clima:</strong> {dest.climate}</p>
        <p><strong>Ore di volo:</strong> {dest.flightHours}</p>
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
