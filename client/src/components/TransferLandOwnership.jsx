import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContext";

const TransferLandOwnership = () => {
  const { contract, accounts, registeredLands } = useAppContext();

  const [formData, setFormData] = useState({
    titleDeedNumber: "",
    newOwner: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!contract || !accounts || accounts.length === 0) {
      setMessage("Error: Contract or accounts not available.");
      return;
    }

    // Check if the entered land is registered
    if (!registeredLands.includes(formData.titleDeedNumber)) {
      setMessage("Error: The entered land is not registered.");
      return;
    }

    setLoading(true);

    try {
      await contract.methods
        .transferOwnership(formData.titleDeedNumber, formData.newOwner)
        .send({ from: accounts[0] });

      setMessage("Land transferred successfully!");
      setFormData({ titleDeedNumber: "", newOwner: "" }); // Reset form after success
    } catch (error) {
      console.error("Error transferring land:", error);
      setMessage("Failed to transfer land. Ensure details are correct.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <Link to="/admin" className="back-link">
        &larr; Back to Dashboard
      </Link>
      <h2>Transfer Land Ownership</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titleDeedNumber"
          placeholder="Title Deed Number"
          value={formData.titleDeedNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="newOwner"
          placeholder="New Owner Address (0x...)"
          value={formData.newOwner}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Transfer Ownership"}
        </button>
      </form>
    </div>
  );
};

export default TransferLandOwnership;
