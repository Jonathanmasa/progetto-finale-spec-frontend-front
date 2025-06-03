// Importo gli hook di stato da React e i componenti di routing di React Router
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  // Uso uno stato booleano per gestire la visibilità del menu su dispositivi mobili
  const [collapsed, setCollapsed] = useState(true);

  // Funzione per invertire lo stato del menu (aperto/chiuso)
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4 custom-navbar">
      <div className="container custom-navbar__container">
        {/* Logo cliccabile che porta alla home */}
        <Link className="navbar-brand custom-navbar__brand" to="/">
          <img className="logo" src="/TopTravel.png" alt="TopTravel" />
        </Link>

        {/* Bottone hamburger visibile solo su schermi piccoli */}
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

        {/* Menu navigazione, collassabile su mobile, visibile fisso su desktop */}
        <div
          className={`collapse navbar-collapse custom-navbar__links ${
            collapsed ? "" : "show"
          } d-lg-flex justify-content-lg-end`}
          id="navbarSupportedContent"
        >
          {/* Link alla homepage - si evidenzia quando attivo */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link custom-navbar__link me-lg-3 ${
                isActive ? "custom-navbar__link--active" : ""
              }`
            }
            onClick={() => setCollapsed(true)} // Chiudo il menu dopo il click
          >
            Home
          </NavLink>

          {/* Link alla pagina di confronto */}
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

          {/* Link alla pagina dei preferiti */}
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
