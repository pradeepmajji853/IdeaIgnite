import { useState } from 'react';
import "./CashWallet.css"

const CashWallet = () => {
    const [amount, setAmount] = useState(0);
    return (
        <div className="CashWallet">
            <div className="CWcard">
                <h1>Cash Wallet</h1>
                <p>Cash</p>
                <h3>{amount}INR</h3>
            </div>
        </div>
    );
};

export default CashWallet;
