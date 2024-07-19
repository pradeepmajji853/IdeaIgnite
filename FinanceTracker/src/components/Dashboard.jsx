import "./Dashboard.css";
import Sidebar from "./Sidebar";
import CashWallet from "./CashWallet";
import BankConnect from "./BankConnect";
import TransactionsList from "./TransactionsList";
export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="Sidebar">
        <Sidebar />
      </div>
      <div className="Dashboardcontents">
      <h1>WALLETS:</h1>
        <div className="Wallets">
          <CashWallet />
          <BankConnect />
        </div>
        <div className="Transactions">
          <TransactionsList />
        </div>
      </div>
    </div>
  );
}
