import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  const { id, title, category, imageUrl, price, description } = destination;

  return (
    <div className="card h-100">
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} style={{ height: '200px', objectFit: 'cover' }} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{category}</p>
        {description && <p className="card-text">{description.slice(0, 80)}...</p>}
        <p className="card-text"><strong>Prezzo:</strong> {price} €</p>
        <Link to={`/detail/${id}`} className="btn btn-primary">Dettagli</Link>
      </div>
    </div>
  );
}
