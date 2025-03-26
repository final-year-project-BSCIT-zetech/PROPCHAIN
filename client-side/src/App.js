import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientNavbar from './components/ClientNavbar';
import ClientDashboard from './components/ClientDashboard';
import TransferOwnership from './components/TransferOwnership';
import ViewLandHistory from './components/ViewLandHistory';
import './App.css';
function App() {

  
  

  return (
    <Router>
      <div className="app">
        <ClientNavbar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={
              <ClientDashboard />
            } />
            <Route path="/transfer" element={
              <TransferOwnership />
            } />
            <Route path="/history" element={
              <ViewLandHistory />
            } />
            <Route path="/" element={
              <ClientDashboard />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;