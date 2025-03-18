import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import RegisterOwner from './components/RegisterOwner';
import RegisterLand from './components/RegisterLand';
import './App.css';

const App = () => {
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);

  return (
    <Router>
      <AdminNavbar /> 

      <Routes>
        {/* Route for registering a land owner */}
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

        {/* Route for registering land */}
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

export default App;
