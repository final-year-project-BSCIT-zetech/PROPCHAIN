import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

const ClientDashboard = () => {
  const { accounts, isConnected, contract } = useAppContext();
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isConnected) {
      fetchRegisteredLands();
    }
  }, [isConnected]); // Runs only when the connection status changes

  const fetchRegisteredLands = async () => {
    setLoading(true);
    setError("");

    try {
      if (!contract || !accounts || accounts.length === 0) {
        setError("Contract or accounts not available.");
        setLoading(false);
        return;
      }

      const landsData = await contract.methods
        .getLandsByOwner(accounts[0])
        .call({ from: accounts[0] });

      setLands(landsData);
    } catch (err) {
      console.error("Error fetching lands:", err);
      setError("Failed to fetch registered lands.");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h2>Your Land Assets</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && lands.length === 0 && <p>No registered land found.</p>}

      <ul>
        {lands.map((land, index) => (
          <li key={index}>
            <strong>Title Deed:</strong> {land}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
