import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionsList from './TransactionsList';
import './CashWallet.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from 'axios';

export default function CashWallet() {
  const [showForm, setShowForm] = useState(false);
  const [CWbal, setCWbal] = useState(0);
  const userId = localStorage.getItem('userId');

  const handleAddTransactionClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = async () => {
    setShowForm(false);
    await fetchBalance();
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions/balance?userId=${userId}`);
      setCWbal(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="CashWallet">
      <div className="CWcard" onClick={handleAddTransactionClick}>
        <div className="CWicon">
          <AccountBalanceWalletIcon />
        </div>
        <div className="CWcontent">
          <h2>Cash Wallet</h2>
          <h3>Cash</h3>
          <h3>{CWbal} INR</h3>
        </div>
      </div>
      {showForm && <TransactionForm onClose={handleCloseForm} />}
      <div className="TL">
        <TransactionsList userId={userId} />
      </div>
    </div>
  );
}
