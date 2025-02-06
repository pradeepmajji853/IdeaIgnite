import "./App.css";
import Heropage from "./Heropage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Features from "./Features.jsx";
import Getstarted from "./Getstarted.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard.jsx";
import Overview from "./Overview.jsx";
import Budgets from "./Budgets.jsx";
import SavingsWallet from "./SavingsWallet.jsx";
import BankAccountdashboard from "./BankAccountdashboard.jsx";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Heropage />
              <Features />
              <Getstarted />
            </Layout>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Layout>
              <SignIn afterSignInUrl="/dashboard" />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <SignUp afterSignUpUrl="/dashboard" />
            </Layout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Layout>
                <Dashboard />
              </Layout>
            </SignedIn>
          }
        />
        <Route
          path="/overview"
          element={
            <SignedIn>
              <Layout>
                <Overview />
              </Layout>
            </SignedIn>
          }
        />
        <Route
          path="/budgets"
          element={
            <SignedIn>
              <Layout>
                <Budgets />
              </Layout>
            </SignedIn>
          }
        />
        <Route
          path="/savingswallet"
          element={
            <SignedIn>
              <Layout>
                <SavingsWallet />
              </Layout>
            </SignedIn>
          }
        />
        <Route
          path="/bankaccountdashboard"
          element={
            <SignedIn>
              <Layout>
                <BankAccountdashboard />
              </Layout>
            </SignedIn>
          }
        />

        {/* Catch-all Route for SignedOut Users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />

        {/* Fallback Route for Unauthorized Access */}
        <Route
          path="/unauthorized"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

