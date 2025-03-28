import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import MyContract from "../contracts/LandRegistry.json";

const ClientNavbar = () => {
  const { setIsConnected, setWeb3, setAccounts, setContract, accounts, isConnected, id, setId, contract } = useAppContext();
  const navigate = useNavigate();
  const [manualId, setManualId] = useState("");
  const [showInput, setShowInput] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("⚠️ MetaMask not found! Please install it.");
    }

    try {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAccounts = await web3Instance.eth.getAccounts();
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = MyContract.networks[networkId];

      if (!deployedNetwork) {
        return alert("⚠️ Smart contract not deployed on this network.");
      }

      setWeb3(web3Instance);
      setAccounts(userAccounts);
      setIsConnected(true);
      const newContract = new web3Instance.eth.Contract(MyContract.abi, deployedNetwork.address);
      setContract(newContract);

      // Try to fetch the ID from the smart contract
      try {
        const readId = await newContract.methods.getMyNationalId().call({ from: userAccounts[0] });
        if (readId) {
          setId(readId);
          navigate("/"); // Navigate once ID is fetched
        } else {
          setShowInput(true); // Show input field if ID is not retrieved
        }
      } catch (error) {
        console.error("Error fetching ID:", error);
        setShowInput(true);
      }
    } catch (error) {
      console.error("⚠️ Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.registerOwner(manualId).send({ from: accounts[0] });
      
      // Try fetching the ID again
      const readId = await contract.methods.getMyNationalId().call({ from: accounts[0] });
      if (readId) {
        setId(readId);
        setShowInput(false);
        navigate("/"); // Navigate once ID is fetched
      }
    } catch (error) {
      console.error("Error registering ID:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Land Registry</div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/transfer">Transfer</Link></li>
        <li><Link to="/history">History</Link></li>
        <li>
          {isConnected ? (
            showInput ? (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Enter your ID"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                />
                <button type='submit'>Submit</button>
              </form>
            ) : (
              <span className="wallet-address">{id}</span>
            )
          ) : (
            <button className="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ClientNavbar;
