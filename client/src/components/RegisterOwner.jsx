import React, { useState } from 'react';

const RegisterOwner = ({ onRegisterOwner }) => {
  const [ownerData, setOwnerData] = useState({
    ownerId: '',
    name: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterOwner(ownerData);
    setOwnerData({ ownerId: '', name: '', address: '' });
  };

  return (
    <div className="form-container">
      <h2>Register Owner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerData.ownerId}
          onChange={(e) => setOwnerData({ ...ownerData, ownerId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={ownerData.name}
          onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={ownerData.address}
          onChange={(e) => setOwnerData({ ...ownerData, address: e.target.value })}
          required
        />
        <button type="submit">Register Owner</button>
      </form>
    </div>
  );
};

export default RegisterOwner;