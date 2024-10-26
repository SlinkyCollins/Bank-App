import "./HamburgerMenu.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="hamburger-menu">
      <button
        className={`hamburger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          <li>
            <NavLink
              to="/"
              className={pathname === "/" ? "active-link" : ""}
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={pathname === "/services" ? "active-link" : ""}
              onClick={toggleMenu}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/client"
              className={pathname === "/client" ? "active-link" : ""}
              onClick={toggleMenu}
            >
              Client
            </NavLink>
          </li>
          <li className="dropdown">
            <span>Features</span>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/features/dashboard" onClick={toggleMenu}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/features/income" onClick={toggleMenu}>
                  Income
                </NavLink>
              </li>
              <li>
                <NavLink to="/features/vans" onClick={toggleMenu}>
                  Vans
                </NavLink>
              </li>
              <li>
                <NavLink to="/features/reviews" onClick={toggleMenu}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={pathname === "/signup" ? "active-link" : ""}
              onClick={toggleMenu}
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={pathname === "/login" ? "active-link" : ""}
              onClick={toggleMenu}
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
