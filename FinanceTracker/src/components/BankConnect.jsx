import React, { useState, useEffect } from "react";
import faker from "faker";
import './BankConnect.css';

const BankConnect = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fakeTransactions, setFakeTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const generateTransactions = (num) => {
    const transactions = [];
    for (let i = 0; i < num; i++) {
      const date = faker.date.past();
      transactions.push({
        id: faker.datatype.uuid(),
        date: date.toISOString().split('T')[0], 
        amount: parseFloat(faker.finance.amount()),
        description: faker.commerce.productName(),
        category: faker.commerce.department(),
        type: Math.random() > 0.5 ? 'Credit' : 'Debit' 
      });
    }
    return transactions;
  };

  const handleAddBankConnect = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    const transactions = generateTransactions(10);
    setFakeTransactions(transactions);

    const totalBalance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount); 
      return transaction.type === 'Credit' ? acc + amount : acc - amount;
    }, 0);
    setBalance(totalBalance);

    // Retrieve the existing transactions from localStorage and add the new ones
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = [...storedTransactions, ...transactions];

    // Store the updated transactions back in localStorage
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  useEffect(() => {
    // Retrieve transactions from localStorage on initial load
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setFakeTransactions(storedTransactions);

    const totalBalance = storedTransactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.type === 'Credit' ? acc + amount : acc - amount;
    }, 0);
    setBalance(totalBalance);
  }, []);

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
        <p>₹{typeof balance === 'number' ? balance.toFixed(2) : '0.00'}</p>
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
                <td>₹{typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : '0.00'}</td>
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
