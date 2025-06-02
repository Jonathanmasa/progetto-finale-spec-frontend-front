import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DestinationCard({ destination, onCompare, compareSelected }) {
  const { id, title, category, image } = destination;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // evita il redirect se cliccato su Link
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(id)) {
      favorites = favorites.filter(fid => fid !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(favorites.includes(id));
  };

  return (
    <div className="card h-100 position-relative overflow-hidden">
      {image && (
        <>
          <img
            src={`http://localhost:3001/images/${image}`}
            alt={title}
            className="card-img-top"
            style={{ objectFit: "cover", height: "200px" }}
          />
          {compareSelected && (
            <div className="selected-badge">✓ Selezionato</div>
          )}
        </>
      )}

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <button
            onClick={toggleFavorite}
            className="btn btn-sm p-0 border-0 bg-transparent"
            title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
          >
            <span style={{ fontSize: "1.3rem" }}>{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        <p className="card-text text-muted">{category}</p>

        <Link to={`/destinations/${id}`} className="btn btn-primary mb-2 mt-3">
          Dettagli
        </Link>

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
