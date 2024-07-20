import React, { useEffect, useState } from "react";

const TransactionsList = ({ user }) => {
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
      <h2>Transactions List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type}: {transaction.amount} on {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
