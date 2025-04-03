import React, { useState } from "react";
import { useAppContext } from "../AppContext";

const ViewLandHistory = () => {
  const [landId, setLandId] = useState("");
  const [landHistory, setLandHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { contract, registeredLands } = useAppContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLandHistory([]);
    setLoading(true);

    try {
      const result = await contract.methods.getLandHistory(landId).call();
      setLandHistory(result);
    } catch (err) {
      console.error("Error fetching land history:", err);
      setError("Failed to fetch land history. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="history-container">
      <h2>Land Ownership History</h2>

      <form className="transfer-form" onSubmit={onSubmit}>
        <label>Land ID:</label>
        <br />
        <input
          type="text"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Get History"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {landHistory.length > 0 && (
        <div className="history-list">
          <h3>Ownership Transfers:</h3>
          <ul style={{listStyleType: "none"}}>
            {landHistory.map((entry, index) => (
              <li key={index}>
                <strong>Previous Owner ID:</strong> {entry.previousOwnerId}{" "}
                <br />
                <strong>New Owner:</strong> {entry.newOwner} <br />
                <strong>Date:</strong>{" "}
                {new Date(Number(entry.timestamp) * 1000).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewLandHistory;
