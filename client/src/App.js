import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Web3 from "web3";
import AdminNavbar from './components/AdminNavbar';
import RegisterOwner from './components/RegisterOwner';
import RegisterLand from './components/RegisterLand';
import './App.css';

const MyContract = require("./contracts/MyContract.json");

const App = () => {
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true); // ✅ Fix: Track first render

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <Router>
      <ForceRedirect isConnected={isConnected} isFirstRender={isFirstRender} /> {/* ✅ Redirects to `/wallet-connect` first */}
      <AdminNavbar />

      <Routes>
        <Route 
          path="/wallet-connect"
          element={<WalletConnect isConnected={isConnected} setIsConnected={setIsConnected} setWeb3={setWeb3} setAccounts={setAccounts} setContract={setContract} />} 
        />

        <Route 
          path="/admin/registerOwner" 
          element={
            <RegisterOwner 
              onRegisterOwner={(ownerData) => {
                setOwners((prevOwners) => [...prevOwners, ownerData]);
                alert('✅ Owner registered successfully!');
              }} 
            />
          } 
        />

        <Route 
          path="/admin/registerLand"  
          element={
            <RegisterLand 
              owners={owners}
              onRegisterLand={(landData) => {
                const ownerExists = owners.some(owner => owner.ownerId === landData.ownerId);
                if (!ownerExists) {
                  alert('❌ Error: Owner ID not found!');
                  return;
                }
                setLands((prevLands) => [...prevLands, landData]);
                alert('✅ Land registered successfully!');
              }} 
            />
          } 
        />
      </Routes>
    </Router>
  );
};

// ✅ Fix: Only redirect on second render
const ForceRedirect = ({ isConnected, isFirstRender }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected && !isFirstRender) {
      navigate('/wallet-connect');
    }
  }, [isConnected, isFirstRender, navigate]);

  return null;
};

// ✅ Fix: Ensure Wallet Connect button is visible
const WalletConnect = ({ isConnected, setIsConnected, setWeb3, setAccounts, setContract }) => {
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("⚠️ MetaMask not found! Please install it.");
      return;
    }

    try {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const userAccounts = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccounts(userAccounts);
      setIsConnected(true);

      console.log("✅ Connected to MetaMask:", userAccounts[0]);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = MyContract.networks[networkId];

      if (!deployedNetwork) {
        alert("⚠️ Smart contract not deployed on this network.");
        return;
      }

      const contractInstance = new web3Instance.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
      );

      setContract(contractInstance);

      // ✅ Redirect to `/admin/registerOwner` after successful wallet connection
      navigate('/admin/registerOwner');
    } catch (error) {
      console.error("⚠️ Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}> {/* ✅ Fix: Ensure button is visible */}
      {!isConnected ? (
        <button onClick={connectWallet} style={{ padding: "10px 20px", marginTop:"10em", fontSize: "18px", cursor: "pointer" }}>
          Connect Wallet
        </button>
      ) : (
        <p>🔗 Wallet Connected! Redirecting...</p>
      )}
    </div>
  );
};

export default App;
