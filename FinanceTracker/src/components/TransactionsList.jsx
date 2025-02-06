import React from 'react';

export default function TransactionsList({ transactions }) {
  return (
    <div className="transactions-list">
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.transactionType}>
            <div><strong>{transaction.description}</strong></div>
            <div>{transaction.category}</div>
            <div className={transaction.transactionType === 'credit' ? 'credit' : 'debit'}>
              ₹{transaction.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



