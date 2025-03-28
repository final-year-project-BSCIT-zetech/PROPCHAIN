import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./AppContext";
import ForceRedirect from "./ForceRedirect";
import WalletConnect from "./WalletConnect";
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./components/AdminDashboard";
import TransferLandOwnership from "./components/TransferLandOwnership";
import RegisterLand from "./components/RegisterLand";
import "./App.css";

const App = () => (
  <AppProvider>
    <Router>
      <ForceRedirect />
      <AdminNavbar />
      <Routes>
        <Route path="/wallet-connect" element={<WalletConnect />} />
        <Route path="/admin/transfer-land-ownership" element={<TransferLandOwnership />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/registerLand" element={<RegisterLand />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
