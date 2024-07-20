import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css';

export default function TransactionForm({ onClose }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/transactions', {
        userId,
        amount,
        description,
        category,
        date,
        type
      });
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="TransactionForm">
      <div className="overlay" onClick={onClose}></div>
      <div className="form-container">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Tuition Fees">Tuition Fees</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}
