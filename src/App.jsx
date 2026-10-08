import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BudgetPlanner from "./pages/BudgetPlanner";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import Analytics from "./pages/Analytics";
import AIFinanceCoach from "./pages/AIFinanceCoach";
import Investments from "./pages/Investments";
import FinancialGoals from "./pages/FinancialGoals";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      {/* Main Pages */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />

      {/* Finance */}
      <Route path="/budget-planner" element={<BudgetPlanner />} />
      <Route path="/expense-tracker" element={<ExpenseTracker />} />

      {/* Upcoming Pages */}
      <Route
        path="/ai-finance-coach"
        element={<AIFinanceCoach />}
      />

      <Route
        path="/investments"
        element={<Investments />}
      />

      <Route
        path="/financial-goals"
        element={<FinancialGoals />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: "40px" }}>
            <h1>404</h1>
            <p>Page not found.</p>
          </div>
        }
      />

    </Routes>
  );
}

export default App;