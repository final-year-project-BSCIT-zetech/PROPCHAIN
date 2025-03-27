import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import MyContract from "../contracts/LandRegistry.json";

const ClientNavbar = () => {
  const { setIsConnected, setWeb3, setAccounts, setContract, accounts,isConnected,id,setId,contract} = useAppContext();
  const navigate = useNavigate();

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
  
      // Now that the contract is set, you can call the method
      const readId = await newContract.methods.getMyNationalId().call({ from: userAccounts[0] });
      console.log(readId); // Log the ID or handle it as needed
      setId(readId)
  
      navigate("/");
    } catch (error) {
      console.error("⚠️ Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
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
            <span className="wallet-address">
              {`${id}`}
            </span>
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