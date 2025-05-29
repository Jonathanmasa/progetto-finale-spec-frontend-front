import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Viaggi</Link>
        <div>
          <NavLink className="nav-link d-inline me-3" to="/" end>
            Home
          </NavLink>
          <NavLink className="nav-link d-inline me-3" to="/compare">
            Confronta
          </NavLink>
          <NavLink className="nav-link d-inline" to="/favorites">
            Preferiti
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
