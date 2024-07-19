import "./App.css";
import Heropage from "./Heropage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./Features.jsx";
import Getstarted from "./Getstarted.jsx";
import Layout from "./Layout.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import Overview from "./Overview.jsx";
import Budgets from "./Budgets.jsx";
import SavingsWallet from "./SavingsWallet.jsx"

function App() {
  return (
    <Router>
      <Routes>
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
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard/>
            </Layout>
          }
        />
        <Route
          path="/overview"
          element={
            <Layout>
              <Overview/>
            </Layout>
          }
        />
        <Route
          path="/Budgets"
          element={
            <Layout>
              <Budgets/>
            </Layout>
          }
        />
        <Route
          path="/savingswallet"
          element={
            <Layout>
              <SavingsWallet/>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
