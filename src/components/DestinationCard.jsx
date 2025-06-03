import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Questo è il componente principale che rappresenta una "card" per una destinazione specifica
export default function DestinationCard({ destination, onCompare, compareSelected }) {
  // Estraggo le proprietà dalla destinazione passata come prop
  const { id, title, category, image } = destination;
  
  // Stato per gestire se la destinazione è nei preferiti
  const [isFavorite, setIsFavorite] = useState(false);

  // Al primo render (e se cambia l'id), verifico se questa destinazione è tra i preferiti salvati nel localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // Funzione per aggiungere o rimuovere la destinazione dai preferiti
  const toggleFavorite = (e) => {
    e.preventDefault(); // Evito che il click sul bottone interrompa la navigazione (se dentro <Link>)

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Se è già tra i preferiti, la rimuovo
    if (favorites.includes(id)) {
      favorites = favorites.filter(fid => fid !== id);
    } else {
      // Altrimenti, la aggiungo
      favorites.push(id);
    }

    // Salvo l'array aggiornato nel localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Aggiorno lo stato locale per riflettere il cambiamento
    setIsFavorite(favorites.includes(id));
  };

  return (
    <div className="card h-100 position-relative overflow-hidden">
      {/* Se c'è un'immagine, la mostro in cima alla card */}
      {image && (
        <>
          <img
            src={`http://localhost:3001/images/${image}`}
            alt={title}
            className="card-img-top"
            style={{ objectFit: "cover", height: "200px" }}
          />
          {/* Se la card è stata selezionata per il confronto, mostro un badge visivo */}
          {compareSelected && (
            <div className="selected-badge">✓ Selezionato</div>
          )}
        </>
      )}

      <div className="card-body d-flex flex-column">
        {/* Titolo e icona per i preferiti */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <button
            onClick={toggleFavorite}
            className="btn btn-sm p-0 border-0 bg-transparent"
            title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          >
            {/* Mostro cuore pieno o vuoto a seconda dello stato */}
            <span style={{ fontSize: "1.3rem" }}>{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Mostro la categoria della destinazione */}
        <p className="card-text text-muted">{category}</p>

        {/* Pulsante per vedere i dettagli, collegato alla route specifica */}
        <Link to={`/destinations/${id}`} className="btn btn-primary mb-2 mt-3">
          Dettagli
        </Link>

        {/* Se è attiva la modalità confronto, mostro il pulsante per (de)selezionare */}
        {onCompare && (
          <button
            className={`btn ${compareSelected ? 'btn-danger' : 'btn-outline-primary'}`}
            onClick={() => onCompare(id)}
          >
            {compareSelected ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
          </button>
        )}
      </div>
    </div>
  );
}
