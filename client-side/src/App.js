import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";
import ClientNavbar from './components/ClientNavbar';
import ClientDashboard from './components/ClientDashboard';
import TransferOwnership from './components/TransferOwnership';
import ViewLandHistory from './components/ViewLandHistory';
import LandRegistryABI from './abis/LandRegistry.json';
import './App.css';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // For ethers v6
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contractABI = [/* Your ABI array here */];
        
        const landContract = new Contract(
          contractAddress,
          LandRegistryABI.abi,
          signer
        );
        
        setContract(landContract);
        setAccount(await signer.getAddress());
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };
  

  return (
    <Router>
      <div className="app">
        <ClientNavbar account={account} connectWallet={connectWallet} />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={
              <ClientDashboard contract={contract} account={account} />
            } />
            <Route path="/transfer" element={
              <TransferOwnership contract={contract} />
            } />
            <Route path="/history" element={
              <ViewLandHistory contract={contract} />
            } />
            <Route path="/" element={
              <ClientDashboard contract={contract} account={account} />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;