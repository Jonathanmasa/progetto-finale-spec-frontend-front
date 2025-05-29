import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById, getAllDestinations } from "../api/destinations";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allIds, setAllIds] = useState([]);

  useEffect(() => {
    // Carica tutti gli id delle destinazioni per navigazione avanti/indietro
    getAllDestinations().then(data => {
      setAllIds(data.map(dest => dest.id));
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDestinationById(id)
      .then(data => {
        setDestination(data.destination || data);
        setError("");
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!destination) return <p>Nessuna destinazione trovata.</p>;

  const currentIndex = allIds.findIndex(did => String(did) === String(id));
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  return (
    <div className="container py-2">
      <h1>{destination.title}</h1>
      {destination.image && (
        <img
          src={`http://localhost:3001/images/${destination.image}`}
          alt={destination.title}
          style={{ maxWidth: "400px", width: "100%", marginBottom: "1rem", borderRadius: "8px" }}
        />
      )}

      <div  style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          className="btn btn-secondary"
          onClick={() => prevId && navigate(`/destinations/${prevId}`)}
          disabled={!prevId}
        >
          Indietro
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => nextId && navigate(`/destinations/${nextId}`)}
          disabled={!nextId}
        >
          Avanti
        </button>
      </div>

      <p><strong>Categoria:</strong> {destination.category}</p>
      <p><strong>Paese:</strong> {destination.country}</p>
      <p><strong>Costo medio:</strong> {destination.averageCost} €</p>
      <p><strong>Miglior stagione:</strong> {destination.bestSeason}</p>
      <p><strong>Clima:</strong> {destination.climate}</p>
      <p><strong>Ore di volo:</strong> {destination.flightHours}</p>
      <p><strong>Attrazioni:</strong></p>
      <ul>
        {destination.attractions && destination.attractions.map((attr, i) => (
          <li key={i}>{attr}</li>
        ))}
      </ul>
    </div>
  );
}