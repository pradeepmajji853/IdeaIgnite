import Sidebar from "./Sidebar.jsx"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SavingsWallet.css';

const SavingsWallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        setTransactions(response.data);
        const initialBalance = response.data.reduce((acc, transaction) => {
          return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        setBalance(initialBalance);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransaction = async (type) => {
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
      type,
      amount: parsedAmount,
      date: new Date().toLocaleString()
    };

    try {
      await axios.post('http://localhost:3000/savingswallet', newTransaction);
      setBalance(newBalance);
      setTransactions([newTransaction, ...transactions]);
      setAmount('');
      setError('');
    } catch (error) {
      console.error('Error saving transaction:', error);
      setError('Failed to save transaction to database');
    }
  };

  return (
    <div className="outerSavingsWallet">
      <Sidebar />
      <div className="savings-wallet">
        <h2>Savings Wallet</h2>
        <div className="balance">
          <h3>Current Balance: ₹{balance.toFixed(2)}</h3>
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
            {transactions.map((transaction, index) => (
              <li key={index} className={transaction.type}>
                <span>{transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}</span>
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
