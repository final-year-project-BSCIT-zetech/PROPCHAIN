import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ClientDashboard({ isConnected, connectWallet }) {
  return (
    <div className="client-dashboard">
      <h1>Land Registry System</h1>
      
      {!isConnected ? (
        <div className="connection-prompt">
          <p>Connect your wallet to continue</p>
          <button onClick={connectWallet} className="connect-btn">
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="dashboard-cards">
          <Link to="/client/transfer" className="dashboard-card">
            <h2>Transfer Ownership</h2>
            <p>Transfer land rights to new owner</p>
          </Link>
          <Link to="/client/history" className="dashboard-card">
            <h2>View History</h2>
            <p>Access ownership history records</p>
          </Link>
        </div>
      )}
    </div>
  );
}

ClientDashboard.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  connectWallet: PropTypes.func.isRequired
};