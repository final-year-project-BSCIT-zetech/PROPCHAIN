import React from "react";
import propImage from '../assets/prop.jpg';
import landVerificationImage from '../assets/land verification.jpg';
import immutableImage from '../assets/imutability.png';
import TrustImage from '../assets/trsut.jpg';
import tampeprof from '../assets/tamperproff.jpg';
import smartconimage from '../assets/smart contracts.jpg';

import "../assets/landingpage.css";

const landblocsItems = [
  { title: "", description: "Blockchain ensures land records cannot be altered or deleted.", image: immutableImage },
  { title: "Transparency", description: "All transactions are publicly verifiable on the blockchain.", image: TrustImage },
  { title: "Tamper-Proof", description: "Secure encryption prevents fraudulent modifications.", image: tampeprof },
  { title: "Land Verification", description: "Verify land ownership and history with blockchain records.", className: "col-span-2", image: landVerificationImage },
  { title: "Smart Contracts", description: "Automate land transactions with self-executing contracts.", image: smartconimage },
  { title: "Fraud Proof", description: "Prevent land fraud through digital identities and cryptography.", image: tampeprof },
  { title: "LandBlocs", description: "Transforming Kenya's land sector through blockchain technology.", className: "col-span-2", image: propImage },
];

const LandingPage = () => {
  return (
    <div className="hero-container">      
      <div className="hero-content">
        <h1 className="hero-title">Transparency You Can Trust – A Future Without Land Fraud</h1>
        <p className="hero-subtitle">
          Land transactions should be clear, verifiable, and tamper-proof—that’s why LandBlocks leverages blockchain to create a fully transparent land registry. Every record is immutable, every transaction is traceable, and every owner is verifiable. No hidden deals, no missing documents—just a system where what’s yours stays yours.
        </p>
        <div className="hero-buttons">
          <button className="primary-button">No more 📜paper trails</button>
          <button className="secondary-button">🛡 Built to prevent fraud</button>
        </div>
      </div>
      <div className="content-container">
        <div className="card">
          <h1>LandBlocks</h1>
          <p>A New Era of Trust in Land Ownership.</p>
          <h2>Leveraging Blockchain in Fraud Detection on Land and Properties: Kenya</h2>
        </div>
        <div className="bento-grid">
          {landblocsItems.map((item, index) => (
            <div key={index} className={`bento-item ${item.className || ''}`}>
              <div className="bento-header">
                <img src={item.image} alt={item.title} className="bento-image" />
              </div>
              <div>
                <div className="bento-title">{item.title}</div>
                <div className="bento-description">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;