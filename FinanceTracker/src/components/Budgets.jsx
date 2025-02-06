import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar.jsx";
import Button from '@mui/material/Button';
import BudgetForm from "./BudgetForm.jsx";
import './Budgets.css';

export default function Budgets() {
  const [showForm, setShowForm] = useState(false);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Load budgets from local storage
    const storedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(storedBudgets);
  }, []);

  const handleFormSubmit = (newBudget) => {
    // Save the new budget to localStorage
    const updatedBudgets = [...budgets, newBudget];
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
    setShowForm(false);
  };

  // Get transactions from localStorage
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  // Function to calculate spent & remaining for each budget
  const calculateBudgetDetails = (budget) => {
    const categoryTransactions = transactions.filter(
      (t) => t.category === budget.category && t.type === "debit"
    );

    const spentAmount = categoryTransactions.reduce((acc, t) => acc + t.amount, 0);
    const remainingAmount = budget.amount - spentAmount;

    return { spentAmount, remainingAmount };
  };

  return (
    <div className="outerbudgets">
      <Sidebar />
      <div className="Budgets">
        <div className="BudgetCard">
          <p>Control your expenses with our smart budgets</p>
          <Button
            variant="contained"
            color="success"
            className="AddBudgetButton"
            onClick={() => setShowForm(true)}
          >
            Add Budget
          </Button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <BudgetForm onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        <div className="BudgetList">
          {budgets.map((budget, index) => {
            const { spentAmount, remainingAmount } = calculateBudgetDetails(budget);
            return (
              <div className="BudgetCard" key={index}>
                <h3>{budget.budgetName}</h3>
                <div className="progress-bar">
                  <div
                    className="progress-bar-spent"
                    style={{ width: `${(spentAmount / budget.amount) * 100}%` }}
                  ></div>
                  <div
                    className="progress-bar-remaining"
                    style={{ width: `${(remainingAmount / budget.amount) * 100}%` }}
                  ></div>
                </div>
                <p><strong>Amount:</strong> {budget.amount} {budget.currency}</p>
                <p><strong>Spent:</strong> {spentAmount} {budget.currency}</p>
                <p><strong>Remaining:</strong> {remainingAmount} {budget.currency}</p>
                <p><strong>Category:</strong> {budget.category}</p>
                <p><strong>Recurrence:</strong> {budget.recurrence}</p>
                <p><strong>Start Date:</strong> {budget.startDate}</p>
                <p><strong>End Date:</strong> {budget.endDate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

