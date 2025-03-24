import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const RegisterLand = () => {
  const [titledeedNumber, setTitledeedNumber] = useState("");
  const { contract, accounts } = useAppContext();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [registeredLands, setRegisteredLands] = useState([]);

  useEffect(() => {
    fetchRegisteredLands();
  }, []);

  // Fetch registered lands from the blockchain
  const fetchRegisteredLands = async () => {
    try {
      const lands = await contract.methods.getAllRegisteredLands().call();
      setRegisteredLands(lands);
    } catch (err) {
      console.error("Error fetching registered lands:", err);
    }
  };

  function onChange(e) {
    setTitledeedNumber(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Check if land is already registered
    if (registeredLands.includes(titledeedNumber)) {
      setError("This land is already registered!");
      return;
    }

    try {
      await contract.methods.registerLand(titledeedNumber).send({ from: accounts[0] });
      setSuccessMessage("Land registered successfully!");
      
      // Refresh registered lands list
      fetchRegisteredLands();
    } catch (err) {
      console.error("Error object:", err);

      let errorMessage = "Failed to register land. Please try again.";

      if (err.message.includes("execution reverted")) {
        const match = err.message.match(/execution reverted: (.*)/);
        if (match) {
          errorMessage = match[1];
        }
      } else if (err.data && err.data.message) {
        errorMessage = err.data.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <Link to="/admin" className="back-link">
        &larr; Back to Dashboard
      </Link>
      <h2>Register Land</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title Deed Number"
          value={titledeedNumber}
          onChange={onChange}
          required
        />
        <button type="submit">Register Land</button>
      </form>

      {/* Display registered lands */}
      <h3>Registered Lands</h3>
      {registeredLands.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title Deed Number</th>
            </tr>
          </thead>
          <tbody>
            {registeredLands.map((land, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{land}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registered lands yet.</p>
      )}
    </div>
  );
};

export default RegisterLand;
