import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4 custom-navbar">
      <div className="container custom-navbar__container">
        <Link className="navbar-brand custom-navbar__brand" to="/">
          <img className="logo" src="/TopTravel.png" alt="TopTravel" />
        </Link>

        {/* Burger visibile solo sotto lg */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Qui sotto: collapse solo sotto lg, su lg+ nav-link sempre visibili e inline */}
        <div
          className={`collapse navbar-collapse custom-navbar__links ${
            collapsed ? "" : "show"
          } d-lg-flex justify-content-lg-end`}
          id="navbarSupportedContent"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link custom-navbar__link me-lg-3 ${
                isActive ? "custom-navbar__link--active" : ""
              }`
            }
            onClick={() => setCollapsed(true)}
          >
            Home
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `nav-link custom-navbar__link me-lg-3 ${
                isActive ? "custom-navbar__link--active" : ""
              }`
            }
            onClick={() => setCollapsed(true)}
          >
            Confronta
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link custom-navbar__link ${
                isActive ? "custom-navbar__link--active" : ""
              }`
            }
            onClick={() => setCollapsed(true)}
          >
            Preferiti
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
