import React, { useState, useEffect } from 'react';

const ClientDashboard = ({ contract, account }) => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      if (contract && account) {
        try {
          const lands = await contract.getOwnedLands(account);
          setLands(lands.map(land => land.toString()));
        } catch (error) {
          console.error("Error fetching lands:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLands();
  }, [contract, account]);

  return (
    <div className="dashboard">
      <h2>Your Land Assets</h2>
      {loading ? (
        <p>Loading lands...</p>
      ) : (
        <div className="lands-grid">
          {lands.map(landId => (
            <div key={landId} className="land-card">
              <h3>Land ID: {landId}</h3>
              <p>Owner: {account}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;