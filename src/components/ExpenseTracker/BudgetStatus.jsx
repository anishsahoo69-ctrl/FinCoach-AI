import { useEffect, useState } from "react";
import {
  Wallet,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import "./BudgetStatus.css";

const BudgetStatus = ({
  budget = 0,
  expenses = [],
}) => {
  const [autoRefreshIndicator, setAutoRefreshIndicator] =
    useState(false);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  /*
   * Update status whenever expenses change
   */
  useEffect(() => {
    setLastUpdated(new Date());

    setAutoRefreshIndicator(true);

    const timer = setTimeout(() => {
      setAutoRefreshIndicator(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [expenses.length]);

  /*
   * Safely convert expense amount to number
   */
  const safeParsePrice = (price) => {
    const parsed = Number.parseFloat(price);

    return isNaN(parsed) ? 0 : parsed;
  };

  /*
   * Current month and year
   */
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  /*
   * Current month expenses
   */
  const currentMonthExpenses = expenses.filter((expense) => {
    if (!expense.date) {
      return false;
    }

    const expenseDate = new Date(expense.date);

    return (
      !isNaN(expenseDate.getTime()) &&
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  /*
   * Calculate total spent
   */
  const currentMonthTotal = currentMonthExpenses.reduce(
    (total, expense) => {
      return total + safeParsePrice(expense.amount ?? expense.price);
    },
    0
  );

  /*
   * Validate budget
   */
  const safeBudget =
    budget && !isNaN(Number(budget))
      ? Number(budget)
      : 0;

  /*
   * Budget percentage
   */
  const budgetPercentage =
    safeBudget > 0
      ? (currentMonthTotal / safeBudget) * 100
      : 0;

  /*
   * Remaining amount
   */
  const remainingAmount =
    safeBudget - currentMonthTotal;

  /*
   * Current month name
   */
  const monthName = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );

  /*
   * Budget status
   */
  const getBudgetStatus = () => {
    if (budgetPercentage >= 100) {
      return {
        title: "Budget exceeded",
        description:
          "You have crossed your monthly spending limit.",
        className: "danger",
        icon: AlertTriangle,
      };
    }

    if (budgetPercentage >= 90) {
      return {
        title: "Budget almost exceeded",
        description:
          "You are very close to your monthly budget limit.",
        className: "danger",
        icon: AlertTriangle,
      };
    }

    if (budgetPercentage >= 70) {
      return {
        title: "Approaching budget limit",
        description:
          "Keep an eye on your spending for the rest of the month.",
        className: "warning",
        icon: TrendingUp,
      };
    }

    return {
      title: "Budget on track",
      description:
        "Your spending is currently within your planned budget.",
      className: "success",
      icon: CheckCircle,
    };
  };

  /*
   * No budget state
   */
  if (safeBudget === 0) {
    return (
      <div className="budget-status-card">

        <div className="budget-status-header">
          <div>
            <span className="budget-status-label">
              FINCOACH AI
            </span>

            <h2>
              Budget Status - {monthName}
            </h2>
          </div>

          <div className="budget-status-icon">
            <Wallet size={22} />
          </div>
        </div>

        <div className="budget-status-updated">
          <Clock size={14} />

          <span>
            Last updated:{" "}
            {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        <div className="no-budget-content">

          <div className="no-budget-icon">
            <Wallet size={34} />
          </div>

          <h3>No Monthly Budget Set</h3>

          <p>
            Set a monthly budget to track your spending
            and receive useful budget alerts.
          </p>

          <div className="budget-tip">
            <span>💡</span>

            <p>
              Set your monthly budget in the Budget
              Planner to start tracking.
            </p>
          </div>

        </div>

      </div>
    );
  }

  const status = getBudgetStatus();
  const StatusIcon = status.icon;

  /*
   * Keep progress bar between 0 and 100
   */
  const progressWidth = Math.min(
    Math.max(budgetPercentage, 0),
    100
  );

  return (
    <div className="budget-status-card">

      {/* Header */}
      <div className="budget-status-header">

        <div>
          <span className="budget-status-label">
            FINCOACH AI
          </span>

          <h2>
            Budget Status - {monthName}
          </h2>
        </div>

        <div className="budget-status-icon">
          <Wallet size={22} />
        </div>

      </div>

      {/* Update Information */}
      <div className="budget-status-meta">

        <div className="budget-last-updated">
          <Clock size={14} />

          <span>
            Last updated:{" "}
            {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        {autoRefreshIndicator && (
          <div className="budget-refresh-indicator">
            <RefreshCw size={14} />

            <span>
              Budget updated
            </span>
          </div>
        )}

      </div>

      {/* Loading-like Refresh */}
      <div className="budget-status-loading">
        <span></span>
      </div>

      {/* Budget Progress */}
      <div className="budget-progress-section">

        <div className="budget-progress-header">

          <div>
            <span>
              Monthly Budget
            </span>

            <strong>
              ₹{currentMonthTotal.toLocaleString("en-IN")}
              {" "}
              /
              {" "}
              ₹{safeBudget.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="budget-percentage">
            {budgetPercentage.toFixed(1)}%
          </div>

        </div>

        {/* Progress Bar */}
        <div className="budget-progress-track">

          <div
            className={`budget-progress-fill ${status.className}`}
            style={{
              width: `${progressWidth}%`,
            }}
          ></div>

        </div>

        {/* Progress Footer */}
        <div className="budget-progress-footer">

          <span className={status.className}>
            {budgetPercentage.toFixed(1)}% used
          </span>

          <span>
            {remainingAmount >= 0
              ? `₹${remainingAmount.toLocaleString(
                  "en-IN"
                )} remaining`
              : `₹${Math.abs(
                  remainingAmount
                ).toLocaleString(
                  "en-IN"
                )} over budget`}
          </span>

        </div>

      </div>

      {/* Status Message */}
      <div
        className={`budget-status-message ${status.className}`}
      >

        <div className="status-message-icon">
          <StatusIcon size={21} />
        </div>

        <div>
          <h3>
            {status.title}
          </h3>

          <p>
            {status.description}
          </p>
        </div>

      </div>

      {/* Spending Information */}
      <div className="budget-spending-info">

        <div>
          <span>
            Monthly Budget
          </span>

          <strong>
            ₹{safeBudget.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>
            Spent This Month
          </span>

          <strong>
            ₹{currentMonthTotal.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

        <div>
          <span>
            Remaining
          </span>

          <strong
            className={
              remainingAmount < 0
                ? "negative"
                : "positive"
            }
          >
            ₹{Math.abs(
              remainingAmount
            ).toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

    </div>
  );
};

export default BudgetStatus;