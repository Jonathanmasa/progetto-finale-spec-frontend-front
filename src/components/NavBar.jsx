import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Viaggi</Link>
        <div>
          <Link className="nav-link d-inline me-3" to="/">Home</Link>
          <Link className="nav-link d-inline me-3" to="/compare">Confronta</Link>
          <Link className="nav-link d-inline" to="/favorites">Preferiti</Link>
        </div>
      </div>
    </nav>
  );
}
