import Sidebar from "./Sidebar.jsx"
import "./Budgets.css"




import React, { useState } from 'react';


const BudgetForm = () => {
  const userId = localStorage.getItem('userId');
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('All categories');
  const [recurrence, setRecurrence] = useState('Monthly');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <>
    {userId}
    <Sidebar/>
    <form className="budget-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Budget</h2>

      <div className="form-group">
        <label className="form-label">Budget Name</label>
        <input
          type="text"
          className="form-input"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="e.g., Food Orders"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 1500"
        />
        <label className="form-label">Currency</label>
        <select
          className="form-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">United States Dollar</option>
          <option value="EUR">Euro</option>
          <option value="GBP">British Pound</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Budgeted For</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All categories">All categories</option>
          <option value="Food">Food</option>
          <option value="Accommodation">Accommodation</option>
          <option value="Tuition Fees">Tuition Fees</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Recurrence</label>
        <div className="recurrence-options">
          {['Once', 'Daily', 'Weekly', 'Biweekly', 'Monthly', 'Yearly'].map((rec) => (
            <button
              type="button"
              className={`recurrence-button ${recurrence === rec ? 'active' : ''}`}
              key={rec}
              onClick={() => setRecurrence(rec)}
            >
              {rec}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-button">Create a Budget</button>
    </form>
    </>
  );
};

export default BudgetForm;


