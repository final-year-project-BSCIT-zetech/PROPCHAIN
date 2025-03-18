import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>Land Registry System</h1>
      </Link>
      <div className="nav-links">
        <Link to="/admin/registerOwner" className="nav-link">
          Register Owner
        </Link>
        <Link to="/admin/registerLand" className="nav-link">
          Register Land
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;