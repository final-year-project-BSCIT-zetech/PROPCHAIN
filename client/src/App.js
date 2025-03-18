import { useEffect, useState } from "react";
import "./App.css";
import { Web3 } from "web3";
const MyContract = require("./contracts/MyContract.json");

function App() {
  const [number, setNumber] = useState(0);
  const [blockchainData, setBlockchainData] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3("http://localhost:8545");
      const id = await web3.eth.net.getId();
      const deployedNetwork = MyContract.networks[id];

      web3.eth.getBlockNumber().then((latestBlock) => {
        console.log(`✅ Connected to Blockchain. Latest Block: ${latestBlock}`);
      });

      const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
      );

      const result = await contract.methods.getData().call();
      setBlockchainData(result);

      const address = await web3.eth.getAccounts();
      setAccounts(address);
    };
    init();
  }, []);

  const handleSendData = async () => {
    if (accounts && accounts.length > 0) {
      const web3 = new Web3("http://localhost:8545"); // ✅ Corrected Web3 instantiation
      const networkId = await web3.eth.net.getId(); // ✅ Get network ID
      const deployedNetwork = MyContract.networks[networkId];
  
      if (!deployedNetwork) {
        console.error("Contract not deployed on this network");
        return;
      }
  
      const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);
      
      await contract.methods.setData(number).send({ from: accounts[0] });
      
      const data = await contract.methods.getData().call();
      setBlockchainData(data);
    }
  };
  

  return (
    <div>
      <h1>Enter the number you want to insert to the Blockchain</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleSendData}>Send to Blockchain</button>
      {blockchainData && <p>Blockchain Data: {Number(blockchainData)}</p>}
    </div>
  );
}

export default App;
