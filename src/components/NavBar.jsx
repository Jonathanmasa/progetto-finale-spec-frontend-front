import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
      <nav className="container-fluid navbar navbar-expand-lg bg-light mb-4 custom-navbar">
        <div className="container custom-navbar__container">
          <Link className="navbar-brand custom-navbar__brand" to="/"><img className='logo' src="/TopTravel.png" alt="" /></Link>
          <div className="d-flex custom-navbar__links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link custom-navbar__link me-3 ${isActive ? 'custom-navbar__link--active' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `nav-link custom-navbar__link me-3 ${isActive ? 'custom-navbar__link--active' : ''}`
              }
            >
              Confronta
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav-link custom-navbar__link ${isActive ? 'custom-navbar__link--active' : ''}`
              }
            >
              Preferiti
            </NavLink>
          </div>
        </div>
    </nav>

  );
}
