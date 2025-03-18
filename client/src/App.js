import { useState } from "react";
import Web3 from "web3";
import { useNavigate } from 'react-router-dom';
import "./App.css";

const MyContract = require("./contracts/MyContract.json");

function App() {
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState(0);
  const [blockchainData, setBlockchainData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("⚠️ MetaMask not found! Please install it.");
      return;
    }

    try {
      // Request account access
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const userAccounts = await web3Instance.eth.getAccounts();
      setWeb3(web3Instance);
      setAccounts(userAccounts);
      setIsConnected(true);

      console.log("✅ Connected to MetaMask:", userAccounts[0]);

      // Get network ID
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = MyContract.networks[networkId];

      if (!deployedNetwork) {
        alert("⚠️ Smart contract not deployed on this network.");
        return;
      }

      // Load contract
      const contractInstance = new web3Instance.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
      );

      setContract(contractInstance);

      // Fetch initial data from the contract
      const result = await contractInstance.methods.getData().call();
      setBlockchainData(result);
    } catch (error) {
      console.error("⚠️ Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  };

  const handleSendData = async () => {
    if (!isConnected || !contract) {
      alert("⚠️ Please connect your wallet first!");
      return;
    }

    try {
      await contract.methods.setData(number).send({ from: accounts[0] });

      const data = await contract.methods.getData().call();
      setBlockchainData(data);
    } catch (error) {
      console.error("⚠️ Transaction error:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (

        { navigate('/');}
      )}
    </div>
  );
}

export default App;
