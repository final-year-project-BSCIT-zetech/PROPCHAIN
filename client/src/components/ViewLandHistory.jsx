import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ViewLandHistory = ({ contract, error, setError }) => {
  const [landId, setLandId] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isValidLandId = (id) => /^\d{8}$/.test(id);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    if (!isValidLandId(landId)) {
      setError("Invalid Land ID (8 digits required)");
      return;
    }

    try {
      setIsLoading(true);
      const historyData = await contract.getLandHistory(landId);
      setHistory(historyData.map(record => ({
        previousOwner: record.previousOwner,
        newOwner: record.newOwner,
        timestamp: new Date(record.timestamp * 1000).toLocaleString()
      })));
    } catch (err) {
      setError(err.message || "Failed to fetch history");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>View Land History</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="search-container">
        <input
          type="text"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
          placeholder="Enter 8-digit Land ID"
          className={landId && !isValidLandId(landId) ? 'invalid' : ''}
        />
        <button 
          onClick={handleSearch}
          className="search-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="history-results">
          <h3>Ownership History for Land ID: {landId}</h3>
          <ul>
            {history.map((record, index) => (
              <li key={index} className="history-item">
                <div className="history-record">
                  <span className="label">From:</span>
                  <span className="address">{record.previousOwner}</span>
                </div>
                <div className="history-record">
                  <span className="label">To:</span>
                  <span className="address">{record.newOwner}</span>
                </div>
                <div className="history-record">
                  <span className="label">Date:</span>
                  <span className="timestamp">{record.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ViewLandHistory.propTypes = {
  contract: PropTypes.object,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired
};

export default ViewLandHistory;