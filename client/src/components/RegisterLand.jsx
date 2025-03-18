import React, { useState } from 'react';

const RegisterLand = ({ owners, onRegisterLand }) => {
  const [landData, setLandData] = useState({
    landId: '',
    ownerId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterLand(landData);
    setLandData({ landId: '', ownerId: '' });
  };

  return (
    <div className="form-container">
      <h2>Register Land</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Land ID"
          value={landData.landId}
          onChange={(e) => setLandData({ ...landData, landId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Owner ID"
          value={landData.ownerId}
          onChange={(e) => setLandData({ ...landData, ownerId: e.target.value })}
          required
        />
        <button type="submit">Register Land</button>
      </form>
    </div>
  );
};

export default RegisterLand;