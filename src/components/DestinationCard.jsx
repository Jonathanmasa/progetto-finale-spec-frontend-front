import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  const { id, title, category, image } = destination;

  return (
    <div className="card h-100">
      {image && (
        <img
          src={`http://localhost:3001/images/${image}`}
          alt={title}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{category}</p>
        <Link to={`/destinations/${id}`} className="btn btn-primary">Dettagli</Link>
      </div>
    </div>
  );
}