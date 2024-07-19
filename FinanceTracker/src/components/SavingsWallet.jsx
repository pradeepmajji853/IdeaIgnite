import Sidebar from "./Sidebar.jsx"
import React, { useState, useEffect } from 'react';
import './SavingsWallet.css';

const SavingsWallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedBalance = localStorage.getItem('balance');
    const savedTransactions = localStorage.getItem('transactions');
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever balance or transactions change
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [balance, transactions]);

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

    const newBalance = type === 'deposit' 
      ? balance + parsedAmount 
      : balance - parsedAmount;
    
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parsedAmount,
      date: new Date().toLocaleString()
    };

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setError('');
  };

  return (
    <div className="savings-wallet">
      <h2>Savings Wallet</h2>
      <div className="balance">
        <h3>Current Balance: ${balance.toFixed(2)}</h3>
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
          {transactions.map(transaction => (
            <li key={transaction.id} className={transaction.type}>
              <span>{transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}</span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavingsWallet;