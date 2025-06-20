// Importo gli hook per gestire stato, effetti collaterali e routing
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById, getAllDestinations } from "../api/destinations";

export default function Detail() {
  // Recupero l'ID della destinazione dalla URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Stato locale per gestire la destinazione, il loading, eventuali errori, ecc.
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allIds, setAllIds] = useState([]); // Mi serve per navigare avanti/indietro
  const [isFavorite, setIsFavorite] = useState(false); // Per gestire il cuore "preferiti"

  // Recupero la lista completa degli ID per sapere chi viene prima/dopo
  useEffect(() => {
    getAllDestinations().then(data => {
      setAllIds(data.map(dest => dest.id));
    });
  }, []);

  // Controllo se l'ID attuale è tra i preferiti salvati nel localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(Number(id))); // Faccio un cast a numero
  }, [id]);

  // Recupero i dati della destinazione corrente in base all'ID
  useEffect(() => {
    setLoading(true);
    getDestinationById(id)
      .then(data => {
        setDestination(data.destination || data); // Fallback in caso il backend risponda in modo diverso
        setError("");
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Gestione del toggle per aggiungere o rimuovere dai preferiti
  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (favorites.includes(Number(id))) {
      updatedFavorites = favorites.filter(favId => favId !== Number(id));
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, Number(id)];
      setIsFavorite(true);
    }

    // Aggiorno il localStorage e lo stato
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  // Render di caricamento
  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-2 align-self-center">Caricamento...</span>
      </div>
    );

  // Render di errore
  if (error)
    return (
      <div className="alert alert-danger my-4" role="alert">
        {error}
      </div>
    );

  // Render nel caso non venga trovata la destinazione
  if (!destination)
    return (
      <div className="alert alert-warning my-4" role="alert">
        Nessuna destinazione trovata.
      </div>
    );

  // Trovo l'indice dell'elemento corrente per capire chi viene prima e dopo
  const currentIndex = allIds.findIndex(did => String(did) === String(id));
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  return (
    <div className="container py-4">
      {/* Titolo con bottone per aggiungere/rimuovere dai preferiti */}
      <h1 className="mb-4 text-primary fw-bold">
        {destination.title}{" "}
        <button
          onClick={toggleFavorite}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: isFavorite ? "red" : "grey",
            verticalAlign: "middle",
          }}
          aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </h1>

      {/* Immagine principale con overlay descrittiva */}
      {destination.image && (
        <div className="detail-image-wrapper mb-4">
          <img
            src={`http://localhost:3001/images/${destination.image}`}
            alt={destination.title}
            className="img-fluid rounded"
          />
          <div className="detail-image-overlay">Scopri questa destinazione!</div>
        </div>
      )}

      {/* Pulsanti di navigazione tra le destinazioni */}
      <div className="d-flex gap-3 mb-4 justify-content-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => prevId && navigate(`/destinations/${prevId}`)}
          disabled={!prevId}
        >
          &laquo; Indietro
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => nextId && navigate(`/destinations/${nextId}`)}
          disabled={!nextId}
        >
          Avanti &raquo;
        </button>
      </div>

      {/* Dati dettagliati della destinazione */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <ul className="list-group shadow-sm">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Categoria:</strong>
              <span className="badge bg-primary rounded-pill">{destination.category}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Paese:</strong>
              <span className="badge bg-success rounded-pill">{destination.country}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Costo medio:</strong>
              <span className="badge bg-warning text-dark rounded-pill">{destination.averageCost} €</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Miglior stagione:</strong>
              <span className="badge bg-info text-dark rounded-pill">{destination.bestSeason}</span>
            </li>
          </ul>
        </div>

        <div className="col">
          <ul className="list-group shadow-sm">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Clima:</strong>
              <span className="badge bg-secondary rounded-pill">{destination.climate}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Ore di volo:</strong>
              <span className="badge bg-danger rounded-pill">{destination.flightHours}</span>
            </li>
            <li className="list-group-item">
              <strong>Attrazioni:</strong>
              <ul className="mt-2 mb-0 ps-3">
                {/* Ciclo tra le attrazioni e le mostro in elenco puntato */}
                {destination.attractions && destination.attractions.map((attr, i) => <li key={i}>{attr}</li>)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
