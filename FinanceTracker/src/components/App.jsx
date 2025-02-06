import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard.jsx";
import "./App.css";

function App() {
  const location = useLocation();

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
              <SignIn afterSignInUrl={new URLSearchParams(location.search).get('after_sign_in_url') || '/dashboard'} />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <SignUp afterSignUpUrl={new URLSearchParams(location.search).get('after_sign_up_url') || '/dashboard'} />
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

        {/* Catch-all Route for SignedOut Users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

