// src/components/TransactionsList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.description}: ${transaction.amount} ({transaction.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionsList;
