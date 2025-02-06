import React from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import CashWallet from "./CashWallet";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <div className="DashboardNav">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                CASH WALLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bankaccountdashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                BANK ACCOUNTS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="Content">
          <CashWallet />
        </div>
      </div>
    </div>
  );
}
