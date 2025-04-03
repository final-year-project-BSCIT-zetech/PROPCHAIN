import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientNavbar from "./components/ClientNavbar";
import ClientDashboard from "./components/ClientDashboard";
import TransferOwnership from "./components/TransferOwnership";
import { AppProvider } from "./AppContext";
import ViewLandHistory from "./components/ViewLandHistory";
import "./App.css";
import LandingPage from "./components/LandingPage";
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <ClientNavbar />
            <Routes>
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/transfer" element={<TransferOwnership />} />
              <Route path="/history" element={<ViewLandHistory />} />
              <Route path="/" element={<LandingPage/>} />
            </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
