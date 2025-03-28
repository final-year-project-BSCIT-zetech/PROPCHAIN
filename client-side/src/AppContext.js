import React, { createContext, useContext, useState} from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);
  const [lands, setLands] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [registeredLands, setRegisteredLands] = useState([]);
  const [id, setId] = useState(null);

  

  return (
    <AppContext.Provider value={{ owners, setOwners, lands, setLands, web3, setWeb3, accounts, setAccounts, contract, setContract, isConnected, setIsConnected,registeredLands, setRegisteredLands,id,setId}}>
      {children}
    </AppContext.Provider>
  );
};
