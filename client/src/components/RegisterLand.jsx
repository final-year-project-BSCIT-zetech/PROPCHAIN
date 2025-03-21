import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterLand = () => {
  const [titledeedNumber, setTitledeedNumber] = useState("");
  

  function onChange(e) {
    setTitledeedNumber(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titledeedNumber);
  };
  <Link to="/admin" className="back-link">
    &larr; Back to Dashboard
  </Link>;

  return (
    <div className="form-container">
      <h2>Register Land</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tittle deed Number"
          value={titledeedNumber}
          onChange={onChange}
          required
        />

        <button type="submit">Register Land</button>
      </form>
    </div>
  );
};

export default RegisterLand;
