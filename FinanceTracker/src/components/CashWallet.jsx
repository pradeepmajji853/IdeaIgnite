import React, { useEffect, useState } from "react";

const CashWallet = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/savingswallet/${user.id}`);
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [user.id]);

  return (
    <div>
      <h2>Cash Wallet</h2>
      {/* Render transactions here */}
    </div>
  );
};

export default CashWallet;
