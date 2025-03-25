import React from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import MyContract from "./contracts/LandRegistry.json";

const WalletConnect = () => {
  const { setIsConnected, setWeb3, setAccounts, setContract } = useAppContext();
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
      setContract(new web3Instance.eth.Contract(MyContract.abi, deployedNetwork.address));

      navigate("/admin");
    } catch (error) {
      console.error("⚠️ Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  };

  return (
    <div className="wallet-container">
      <button onClick={connectWallet} className="connect-btn">
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletConnect;
