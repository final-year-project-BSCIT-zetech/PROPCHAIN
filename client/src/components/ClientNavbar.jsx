import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientNavbar() {
  return (
    <nav className="client-navbar">
      <Link to="/client" className="nav-brand">Client Portal</Link>
      <div className="nav-links">
        <Link to="/client/transfer" className="nav-link">Transfer Ownership</Link>
        <Link to="/client/history" className="nav-link">View History</Link>
      </div>
    </nav>
  );
}