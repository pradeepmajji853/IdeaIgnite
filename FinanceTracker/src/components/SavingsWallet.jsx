import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import './SavingsWallet.css';

const SavingsWallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve saved transactions from local storage on initial load
    const savedTransactions = JSON.parse(localStorage.getItem('savingsWalletTransactions')) || [];
    setTransactions(savedTransactions);

    // Calculate the balance from saved transactions
    const initialBalance = savedTransactions.reduce((acc, transaction) => {
      return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    setBalance(initialBalance);
  }, []);

  const saveTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    
    // Save the updated transactions to local storage
    localStorage.setItem('savingsWalletTransactions', JSON.stringify(updatedTransactions));
    
    setTransactions(updatedTransactions);
    
    // Update the balance based on the new transaction
    const newBalance = newTransaction.type === 'deposit'
      ? balance + newTransaction.amount
      : balance - newTransaction.amount;
    setBalance(newBalance);
  };

  const handleTransaction = (type) => {
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    if (type === 'withdraw' && parsedAmount > balance) {
      setError('Insufficient funds.');
      return;
    }

    const newTransaction = {
      id: new Date().getTime(),
      amount: parsedAmount,
      type,
      date: new Date().toLocaleString(),
    };

    saveTransaction(newTransaction);
    setAmount('');
    setError('');
  };

  return (
    <div className="outerSavingsWallet">
      <Sidebar />
      <div className="savings-wallet">
        <h2>Savings Wallet</h2>
        <div className="balance">
          <h3>Current Balance: ₹ {balance.toFixed(2)}</h3>
        </div>
        <div className="transaction">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={() => handleTransaction('deposit')}>Deposit</button>
          <button onClick={() => handleTransaction('withdraw')}>Withdraw</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className={transaction.type}>
                <span>{transaction.type === 'deposit' ? '+' : '-'} {transaction.amount.toFixed(2)}</span>
                <span>{transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsWallet;
