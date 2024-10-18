import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
 
export default function Navbar() {
  const cookie = localStorage.getItem("cookie");
  const navigate = useNavigate();  
  const handleLogout = () => {
      localStorage.removeItem('cookie');
       navigate('/login'); 
  };
  return (
<nav className="navbar">
  <div className="logo-name">
    <img src="/logoVCE.png" alt="VCE Logo" className="logo-image" />
    <h1 className="logo">VCE Library</h1>
  </div>

  {!cookie && (
    <div className="nav-links">
      <Link className="link-login" to="/login">
        Login
      </Link>
      <Link className="link-signup" to="/signup">
        Signup
      </Link>
    </div>
  )}

  {cookie && (
    <div className="nav-links">
      <Link className="link-home" to="/">
        Home
      </Link>
      <Link className="link-books" to="/books">
        Books
      </Link>
      <Link className="link-borrowed" to="/borrowed">
        Borrowed
      </Link>

      <div className="user-dropdown">
        <button className="dropbtn">User Settings</button>
        <div className="dropdown-content">
          <Link className="link-profile" to="/profile">
            Profile
          </Link>
          <Link className="link-contact" to="/contact">
            Contact Us
          </Link>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )}
</nav>

  );
}
