import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar';
import RegisterOwner from './components/RegisterOwner';
import RegisterLand from './components/RegisterLand';
import './App.css';

const App = () => {
  // Mock data storage (replace with API later)
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);

  return (
    <div className="App">
      <AdminNavbar />
      <div className="content">
        <RegisterOwner 
          onRegisterOwner={(ownerData) => {
            setOwners([...owners, ownerData]);
            alert('Owner registered (mock)!');
          }}
        />
        <RegisterLand 
          owners={owners}
          onRegisterLand={(landData) => {
            // Check if owner exists (mock validation)
            const ownerExists = owners.some(owner => owner.ownerId === landData.ownerId);
            if (!ownerExists) {
              alert('Error: Owner ID not found!');
              return;
            }
            setLands([...lands, landData]);
            alert('Land registered (mock)!');
          }}
        />
      </div>
    </div>
  );
};

export default App;