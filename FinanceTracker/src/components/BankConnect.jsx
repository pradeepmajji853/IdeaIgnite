import React, { useState } from "react";
import faker from "faker";
import './BankConnect.css';

const BankConnect = () => {
  // Function to generate fake transactions
  const generateTransactions = (num) => {
    const transactions = [];
    for (let i = 0; i < num; i++) {
      transactions.push({
        id: faker.datatype.uuid(),
        date: faker.date.past().toDateString(), // Convert date to readable string
        amount: parseFloat(faker.finance.amount()),
        description: faker.commerce.productName(),
        category: faker.commerce.department(),
        type: Math.random() > 0.5 ? 'Credit' : 'Debit' // Randomly assign type
      });
    }
    return transactions;
  };

  const [showPopup, setShowPopup] = useState(false);
  const [fakeTransactions, setFakeTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  // Handler to show the popup and generate transactions
  const handleAddBankConnect = () => {
    setShowPopup(true);
  };

  // Handler to close the popup and set fake transactions
  const handlePopupClose = () => {
    setShowPopup(false);
    const transactions = generateTransactions(20);
    setFakeTransactions(transactions);

    // Calculate a mock balance from transactions
    const totalBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'Credit' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    setBalance(totalBalance);
  };

  return (
    <div className="bank-connect">
      <button onClick={handleAddBankConnect}>Add Bank Connect</button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>
              Note: "Please be aware that this is a prototype and not a production-level application.
              Consequently, we do not have the required permissions to access real bank transactions.
              Instead, we have generated simulated transactions that closely resemble real-time bank account data."
            </p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      <div className="balance-card">
        <h3>Current Balance</h3>
        <p>${balance.toFixed(2)}</p>
      </div>
      <div className="transactions-list">
        <h3>Fake Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {fakeTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankConnect;
