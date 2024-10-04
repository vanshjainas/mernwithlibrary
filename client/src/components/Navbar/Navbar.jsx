import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const cookie = localStorage.getItem("cookie");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const Logout = () => {
    localStorage.removeItem("cookie");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo-name">
        <Link to="/" className="web-name">
          VCE Library Mangament
        </Link>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        {cookie && (
          <>
            <Link className="link-profile" to="/my-profile">
              My Profile
            </Link>
            <button onClick={Logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
