import React, { useState } from 'react';

export default function TransactionForm({ onClose, saveTransaction }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('credit'); // Default is 'credit'
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  const categories = ['Fees', 'Rent', 'Beauty', 'Groceries', 'Entertainment', 'Travel'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: new Date().getTime(),
      amount: parseFloat(amount),
      description,
      category,
      transactionType,
      date, // Add the date field
    };

    saveTransaction(newTransaction);
    onClose();
  };

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type:
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </label>
        <button type="submit">Add Transaction</button>
      </form>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}
