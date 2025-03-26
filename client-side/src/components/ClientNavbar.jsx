import React from 'react';
import { Link } from 'react-router-dom';

const ClientNavbar = ({ account, connectWallet }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Land Registry</div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/transfer">Transfer</Link></li>
        <li><Link to="/history">History</Link></li>
        <li>
          {account ? (
            <span className="wallet-address">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </span>
          ) : (
            <button className="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ClientNavbar;