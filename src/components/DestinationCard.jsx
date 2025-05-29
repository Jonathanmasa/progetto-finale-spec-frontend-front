import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  const { id, title, category } = destination;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{category}</p>
        
        <Link to={`/destinations/${id}`} className="btn btn-primary">Dettagli</Link>
      </div>
    </div>
  );
}
