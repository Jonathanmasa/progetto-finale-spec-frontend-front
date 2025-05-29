import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDestinationById } from "../api/destinations";

export default function Detail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>{destination.title}</h1>
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