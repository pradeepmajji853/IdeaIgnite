import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import Sidebar from "./Sidebar.jsx";
import "./Overview.css";

export default function Overview() {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        // Fetch transactions from the API
        axios.get(`http://localhost:3000/transactions?userId=${userId}`)
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the transactions!", error);
            });
    }, [userId]);

    // Process transactions to get data for the pie chart
    const categoryData = transactions.reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += parseFloat(amount);
        return acc;
    }, {});

    const pieChartData = Object.keys(categoryData).map(key => ({
        name: key,
        value: categoryData[key],
        percent: categoryData[key] / Object.values(categoryData).reduce((a, b) => a + b, 0) * 100,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <div className="Overview">
            <Sidebar />
            <div className="chart-container">
                <h2>Spending by Category</h2>
                <PieChart width={600} height={400}>
                    <Pie
                        data={pieChartData}
                        cx={300}
                        cy={200}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={false}  // Disable labels inside pie slices
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        content={({ payload }) => (
                            <div className="custom-legend">
                                {payload.map((entry, index) => (
                                    <div key={`item-${index}`} style={{ color: entry.payload.fill }}>
                                        {entry.payload.name}: {entry.payload.percent.toFixed(0)}%
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </PieChart>
            </div>
        </div>
    );
}

