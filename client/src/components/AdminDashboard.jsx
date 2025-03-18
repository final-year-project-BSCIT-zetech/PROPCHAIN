import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 class='hd'>Land Registry Administration</h1>
      <div className="dashboard-grid">
        <Link to="/admin/registerOwner" className="dashboard-card">
          <div className="card-content">
            <h2>Register Owner</h2>
            <p>Create new property owner records</p>
          </div>
        </Link>
        
        <Link to="/admin/registerLand" className="dashboard-card">
          <div className="card-content">
            <h2>Register Land</h2>
            <p>Record new land titles and properties</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;