import {
  AlertTriangle,
  Bell,
} from "lucide-react";
import "./BudgetWarning.css";

const BudgetWarning = ({ budget = 0, expenses = [] }) => {
  // Safely parse expense amount
  const safeParsePrice = (price) => {
    const parsed = Number.parseFloat(price);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter current month expenses
  const currentMonthExpenses = expenses.filter((expense) => {
    if (!expense.date) return false;

    const expenseDate = new Date(expense.date);

    if (Number.isNaN(expenseDate.getTime())) {
      return false;
    }

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Calculate current month total
  const currentMonthTotal = currentMonthExpenses.reduce(
    (total, expense) => {
      return total + safeParsePrice(expense.amount ?? expense.price);
    },
    0
  );

  // Safely parse budget
  const safeBudget =
    budget && !Number.isNaN(Number(budget))
      ? Number(budget)
      : 0;

  // Calculate percentage
  const budgetPercentage =
    safeBudget > 0
      ? (currentMonthTotal / safeBudget) * 100
      : 0;

  // Current month name
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  // Don't show warning if there is no budget
  if (safeBudget <= 0) {
    return null;
  }

  // ==========================================
  // 90% OR MORE - WARNING
  // ==========================================

  if (budgetPercentage >= 90) {
    return (
      <div className="budget-warning danger">
        <div className="budget-warning-icon">
          <AlertTriangle size={22} />
        </div>

        <div className="budget-warning-content">
          <h3>Budget Warning!</h3>

          <p>
            You've reached{" "}
            <strong>{budgetPercentage.toFixed(1)}%</strong>{" "}
            of your ₹{safeBudget.toLocaleString("en-IN")} budget
            for {monthName}.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 70% OR MORE - ALERT
  // ==========================================

  if (budgetPercentage >= 70) {
    return (
      <div className="budget-warning warning">
        <div className="budget-warning-icon">
          <Bell size={22} />
        </div>

        <div className="budget-warning-content">
          <h3>Budget Alert</h3>

          <p>
            You've used{" "}
            <strong>{budgetPercentage.toFixed(1)}%</strong>{" "}
            of your ₹{safeBudget.toLocaleString("en-IN")} budget
            for {monthName}.
          </p>
        </div>
      </div>
    );
  }

  // No warning below 70%
  return null;
};

export default BudgetWarning;