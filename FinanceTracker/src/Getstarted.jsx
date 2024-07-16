import React from 'react';
import GScontent from './GScontent.jsx';
import GSimage from './GSimage.jsx';
import GSvideo from './GSvideo.jsx';
import './Getstarted.css';

export default function Getstarted() {
  return (
    <div className="Getstarted">
      <div className="heading">
       <h1>Get Started :</h1>
      </div>
      <div className="step1">
        <div className="step1content">
          <GScontent 
            title="Bank connect" 
            content={[
              "Connect your bank accounts and all your transactions will get automatically imported",
              "Connect your e-wallets, cryptocurrencies...",
              "Add your cash expenses manually"
            ]} 
          />
        </div>
        <div className="step1img">
          <GSimage image="/assets/GSimage1.webp" />
        </div>
      </div>
      <div className="step2">
        <div className="step2img">
          <GSvideo video="/assets/GSimage2.mp4" />
        </div>
        <div className="step2content">
          <GScontent 
            title="Budgeting" 
            content={[
              "Create budgets to manage your expenses",
              "Get notifications for budget limits",
              "Analyze your spending patterns"
            ]} 
          />
        </div>
      </div>
      <div className="step3">
        <div className="step3content">
          <GScontent 
            title="Savings" 
            content={[
              "Set up savings goals",
              "Track your savings progress",
              "Automate savings from your income"
            ]} 
          />
        </div>
        <div className="step3img">
          <GSimage image="/assets/GSimage3.png" />
        </div>
      </div>
    </div>
  );
}
