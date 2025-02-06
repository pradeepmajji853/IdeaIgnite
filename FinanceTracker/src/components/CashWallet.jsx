import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionsList from './TransactionsList';
import './CashWallet.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function CashWallet() {
  const [showForm, setShowForm] = useState(false);
  const [CWbal, setCWbal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem('userId');

  const handleAddTransactionClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchBalance(); // Update balance after adding a transaction
  };

  const fetchBalance = () => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const totalBalance = savedTransactions.reduce((acc, transaction) => 
      acc + (transaction.type === "Credit" ? transaction.amount : -transaction.amount), 0);
    setCWbal(totalBalance);
  };

  const saveTransaction = (newTransaction) => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    savedTransactions.push({ ...newTransaction, source: "CashWallet", userId }); // Added userId to the transaction
    localStorage.setItem('transactions', JSON.stringify(savedTransactions));
    setTransactions(savedTransactions); // Update the state with the saved transactions
    fetchBalance(); // Recalculate the balance after saving
  };

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
    fetchBalance();
  }, []);

  return (
    <div className="CashWallet">
      <div className="CWcard">
        <div className="CWicon">
          <AccountBalanceWalletIcon />
        </div>
        <div className="CWcontent">
          <h2>Cash Wallet</h2>
          <h3>Cash</h3>
          <h3>₹{CWbal}</h3>
        </div>
        <button className="add-transaction-btn" onClick={handleAddTransactionClick}>+ Add Transaction</button>
      </div>

      {showForm && (
        <div className="transaction-form-modal">
          <div className="overlay" onClick={handleCloseForm}></div>
          <TransactionForm onClose={handleCloseForm} saveTransaction={saveTransaction} />
        </div>
      )}

      <div className="TL">
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
}
