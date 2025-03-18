import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import AdminNavbar from './components/AdminNavbar';
import RegisterOwner from './components/RegisterOwner';
import RegisterLand from './components/RegisterLand';
import './App.css';

const App = () => {
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);

  return (
    <Router>
      <ForceRedirect /> {/* ✅ Component to redirect on load */}
      <AdminNavbar />  

      <Routes>
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

// ✅ This component forces redirect when the app loads
const ForceRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/registerOwner'); // ✅ Redirect on app load
  }, [navigate]);

  return null; // Doesn't render anything
};

export default App;
