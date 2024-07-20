import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import CashWallet from "./CashWallet";
import BankConnect from "./BankConnect";
import TransactionsList from "./TransactionsList";


export default function Dashboard() {
  
  const userId = localStorage.getItem('userId');
  

  return (
    <div className="Dashboard">
      <h1>{userId}</h1>
      <Sidebar></Sidebar>

      
    </div>
  );
}
