import { Link } from 'react-router-dom';

export default function DestinationCard({ destination, onCompare, compareSelected }) {
  console.log('Rendering DestinationCard:', destination.title, 'Selected:', compareSelected);
  const { id, title, category, image } = destination;

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
            <div className="selected-badge">
              ✓ Selezionato
            </div>
          )}
        </>
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
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
