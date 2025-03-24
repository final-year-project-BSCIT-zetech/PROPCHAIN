import React, { useState } from "react";
import { Link } from "react-router-dom";

const TransferLandOwnership = () => {
  const [formData, setFormData] = useState({
    titledeedNumber: "",
    newOwner: "",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

  };

  return (
    <div className="form-container">
      <Link to="/admin" className="back-link">
        &larr; Back to Dashboard
      </Link>
      <h2>Transfer Land Ownership</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titledeedNumber"
          placeholder="Title Deed Number"
          value={formData.titledeedNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="newOwner"
          placeholder="New Owner Address"
          value={formData.newOwner}
          onChange={handleChange}
          required
        />
        <button type="submit">Register Owner</button>
      </form>
    </div>
  );
};

export default TransferLandOwnership;
