import React, { useState } from 'react';

const TransferOwnership = ({ contract }) => {
  const [landId, setLandId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!contract) {
      setError('Wallet not connected');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.transferOwnership(landId, newOwner);
      await tx.wait();
      setLandId('');
      setNewOwner('');
      alert('Transfer successful!');
    } catch (err) {
      setError(err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-form">
      <h2>Transfer Land Ownership</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label>Land ID:</label>
          <input
            type="text"
            value={landId}
            onChange={(e) => setLandId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Owner Address:</label>
          <input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Transfer Ownership'}
        </button>
      </form>
    </div>
  );
};

export default TransferOwnership;