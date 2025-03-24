import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 class='hd'>Land Registry Administration</h1>
      <div className="dashboard-grid">
        <Link to="/admin/transfer-land-ownership" className="dashboard-card">
          <div className="card-content">
            <h2>transfer land ownership</h2>
            <p>Transfer land from one owner to another</p>
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