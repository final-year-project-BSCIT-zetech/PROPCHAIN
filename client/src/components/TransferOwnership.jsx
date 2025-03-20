import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

const TransferOwnership = ({ contract, error, setError }) => {
  const [landId, setLandId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidLandId = (id) => /^\d{8}$/.test(id);
  const isValidAddress = (address) => ethers.utils.isAddress(address);

  const handleTransfer = async (e) => {
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

    if (!isValidAddress(newOwner)) {
      setError("Invalid Ethereum address");
      return;
    }

    try {
      setIsLoading(true);
      const tx = await contract.transferOwnership(landId, newOwner);
      await tx.wait();
      alert("Ownership transferred successfully!");
      setLandId('');
      setNewOwner('');
    } catch (err) {
      setError(err.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Transfer Land Ownership</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label>Land ID:</label>
          <input
            type="text"
            value={landId}
            onChange={(e) => setLandId(e.target.value)}
            placeholder="Enter 8-digit Land ID"
            className={landId && !isValidLandId(landId) ? 'invalid' : ''}
          />
        </div>

        <div className="form-group">
          <label>New Owner Address:</label>
          <input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="Enter new owner's wallet address"
            className={newOwner && !isValidAddress(newOwner) ? 'invalid' : ''}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Transfer Ownership'}
        </button>
      </form>
    </div>
  );
};

TransferOwnership.propTypes = {
  contract: PropTypes.object,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired
};

export default TransferOwnership;