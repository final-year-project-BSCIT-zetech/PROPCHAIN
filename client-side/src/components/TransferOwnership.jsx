import React, { useState } from 'react';

const TransferOwnership = ({ contract }) => {
  const [landId, setLandId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  
  

  return (
    <div className="transfer-form">
      <h2>Transfer Land Ownership</h2>
      <form >
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
      </form>
    </div>
  );
};

export default TransferOwnership;