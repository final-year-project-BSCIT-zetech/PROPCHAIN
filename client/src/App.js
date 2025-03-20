import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3 from 'web3';
import AdminNavbar from './components/AdminNavbar';
import ClientNavbar from './components/ClientNavbar';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import RegisterOwner from './components/RegisterOwner';
import RegisterLand from './components/RegisterLand';
import TransferOwnership from './components/TransferOwnership';
import ViewLandHistory from './components/ViewLandHistory';
import './App.css';

const ADMIN_CONTRACT_ADDRESS = 'ADMIN_CONTRACT_ADDRESS';
const CLIENT_CONTRACT_ADDRESS = 'CLIENT_CONTRACT_ADDRESS';
const ADMIN_ABI = [/* Admin contract ABI */];
const CLIENT_ABI = [/* Client contract ABI */];
const ADMIN_WALLET = 'ADMIN_WALLET_ADDRESS';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [adminContract, setAdminContract] = useState(null);
  const [clientContract, setClientContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await web3Instance.eth.getAccounts();
          
          if (accounts.length > 0) {
            await handleWalletConnection(web3Instance);
          }
        } catch (error) {
          setError(error.message);
        }
      }
    };
    init();
  }, []);

  const handleWalletConnection = async (web3Instance) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3Instance.eth.getAccounts();
      
      // Admin contract setup
      const networkId = await web3Instance.eth.net.getId();
      const adminDeployed = ADMIN_ABI.networks[networkId];
      const adminContract = new web3Instance.eth.Contract(
        ADMIN_ABI,
        adminDeployed.address
      );

      // Client contract setup
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const clientContract = new ethers.Contract(
        CLIENT_CONTRACT_ADDRESS,
        CLIENT_ABI,
        provider.getSigner()
      );

      setWeb3(web3Instance);
      setAdminContract(adminContract);
      setClientContract(clientContract);
      setIsConnected(true);
      setIsAdmin(accounts[0].toLowerCase() === ADMIN_WALLET.toLowerCase());
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Router>
      {isAdmin ? <AdminNavbar /> : <ClientNavbar />}
      
      <div className="main-content">
        {error && <div className="global-error">{error}</div>}
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/client">
              <AdminRoutes owners={owners} setOwners={setOwners} lands={lands} setLands={setLands} />
            </ProtectedRoute>
          }/>

          {/* Client Routes */}
          <Route path="/client/*" element={
            <ProtectedRoute isAllowed={!isAdmin} redirectPath="/admin">
              <ClientRoutes 
                isConnected={isConnected}
                connectWallet={() => handleWalletConnection(new Web3(window.ethereum))}
                clientContract={clientContract}
                error={error}
                setError={setError}
              />
            </ProtectedRoute>
          }/>

          <Route path="/" element={<Navigate to={isAdmin ? "/admin" : "/client"} />} />
        </Routes>
      </div>
    </Router>
  );
};

const ProtectedRoute = ({ children, isAllowed, redirectPath }) => {
  const location = useLocation();
  return isAllowed ? children : <Navigate to={redirectPath} state={{ from: location }} replace />;
};

const AdminRoutes = ({ owners, setOwners, lands, setLands }) => (
  <Routes>
    <Route index element={<AdminDashboard />} />
    <Route path="register-owner" element={<RegisterOwner onRegisterOwner={setOwners} />} />
    <Route path="register-land" element={<RegisterLand owners={owners} onRegisterLand={setLands} />} />
  </Routes>
);

const ClientRoutes = ({ isConnected, connectWallet, clientContract, error, setError }) => (
  <Routes>
    <Route index element={<ClientDashboard isConnected={isConnected} connectWallet={connectWallet} />} />
    <Route path="transfer" element={<TransferOwnership contract={clientContract} error={error} setError={setError} />} />
    <Route path="history" element={<ViewLandHistory contract={clientContract} error={error} setError={setError} />} />
  </Routes>
);

export default App;