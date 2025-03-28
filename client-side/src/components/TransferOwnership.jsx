import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

const TransferOwnership = () => {
  const [landId, setLandId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { contract, accounts, setRegisteredLands, registeredLands } = useAppContext();

  useEffect(() => {
    fetchRegisteredLands();
  }, []);

  const fetchRegisteredLands = async () => {
    try {
      const lands = await contract.methods.getAllRegisteredLands().call();
      setRegisteredLands(lands);
    } catch (err) {
      console.error("Error fetching registered lands:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setLoading(true);

    if (!registeredLands.includes(landId)) {
      setError("This title deed is not registered or you are not the owner.");
      setLoading(false);
      return;
    }

    try {
      await contract.methods.transferOwnership(landId, newOwner).send({ from: accounts[0] });
      setMessage("Land transferred successfully!");
    } catch (error) {
      console.error("Error transferring land:", error);
      setError("Failed to transfer land. Ensure details are correct.");
    }

    setLoading(false);
  };

  return (
    <div className="transfer-form">
      <h2>Transfer Land Ownership</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      
      <form onSubmit={handleSubmit}>
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
          {loading ? "Transferring..." : "Transfer Ownership"}
        </button>
      </form>
    </div>
  );
};

export default TransferOwnership;
