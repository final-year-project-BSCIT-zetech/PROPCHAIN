import React, { useState, useEffect } from 'react';

const ViewLandHistory = ({ contract }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (contract) {
        try {
          const filter = contract.filters.OwnershipTransferred();
          const events = await contract.queryFilter(filter);
          
          const formattedHistory = events.map(event => ({
            landId: event.args.landId.toString(),
            from: event.args.from,
            to: event.args.to,
            txHash: event.transactionHash,
            timestamp: new Date(event.args.timestamp * 1000).toLocaleDateString()
          }));

          setHistory(formattedHistory);
        } catch (error) {
          console.error("Error fetching history:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHistory();
  }, [contract]);

  return (
    <div className="history-table">
      <h2>Land Ownership History</h2>
      {loading ? (
        <p>Loading history...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Land ID</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{record.landId}</td>
                <td>{`${record.from.slice(0, 6)}...${record.from.slice(-4)}`}</td>
                <td>{`${record.to.slice(0, 6)}...${record.to.slice(-4)}`}</td>
                <td>{record.timestamp}</td>
                <td>
                  <a
                    href={`https://etherscan.io/tx/${record.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewLandHistory;