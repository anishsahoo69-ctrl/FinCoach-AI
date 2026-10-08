import { useEffect, useRef, useState } from "react";
import {
  Wallet,
  CalendarDays,
  Receipt,
  CreditCard,
  RefreshCw,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import "./ExpenseTotal.css";

const CATEGORY_LABELS = {
  food: "Food",
  medicines: "Medicines",
  travel: "Travel",
  study: "Study",
  emergency: "Emergency",
  shopping: "Shopping",
  saving: "Saving / Investment",
  other: "Other",
};

const ExpenseTotal = ({
  income = 0,
  expenses = [],
  loading = false,
}) => {
  const [autoRefreshIndicator, setAutoRefreshIndicator] =
    useState(false);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const previousLength = useRef(0);
  const isInitialMount = useRef(true);

  /*
   * Update timestamp when expenses are added or removed
   */
  useEffect(() => {
    const currentLength = expenses.length;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousLength.current = currentLength;
      setLastUpdated(new Date());
      return;
    }

    if (currentLength !== previousLength.current) {
      setLastUpdated(new Date());
      setAutoRefreshIndicator(true);

      const timer = setTimeout(() => {
        setAutoRefreshIndicator(false);
      }, 3000);

      previousLength.current = currentLength;

      return () => clearTimeout(timer);
    }
  }, [expenses.length]);

  /*
   * Safely parse expense amount
   */
  const safeParsePrice = (price) => {
    const parsed = Number.parseFloat(price);

    return Number.isNaN(parsed) ? 0 : parsed;
  };

  /*
   * Safely parse income
   */
  const safeIncome = safeParsePrice(income);

  /*
   * Calculate total expenses
   */
  const totalExpense = expenses.reduce((total, expense) => {
    return (
      total +
      safeParsePrice(expense.amount ?? expense.price)
    );
  }, 0);

  /*
   * Current month
   */
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  /*
   * Filter current month expenses
   */
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

  /*
   * Current month total
   */
  const currentMonthTotal =
    currentMonthExpenses.reduce((total, expense) => {
      return (
        total +
        safeParsePrice(expense.amount ?? expense.price)
      );
    }, 0);

  /*
   * Remaining money
   */
  const remainingMoney = safeIncome - totalExpense;

  /*
   * Spending percentage
   */
  const spendingPercentage =
    safeIncome > 0
      ? (totalExpense / safeIncome) * 100
      : 0;

  /*
   * Month name
   */
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  /*
   * Category breakdown
   */
  const categoryBreakdown = currentMonthExpenses.reduce(
    (accumulator, expense) => {
      const category = expense.category || "other";

      if (!accumulator[category]) {
        accumulator[category] = {
          total: 0,
          count: 0,
        };
      }

      accumulator[category].total += safeParsePrice(
        expense.amount ?? expense.price
      );

      accumulator[category].count += 1;

      return accumulator;
    },
    {}
  );

  /*
   * Format currency
   */
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  /*
   * Progress bar width
   */
  const progressWidth = Math.min(
    Math.max(spendingPercentage, 0),
    100
  );

  /*
   * Progress status
   */
  const getProgressStatus = () => {
    if (spendingPercentage > 90) {
      return "danger";
    }

    if (spendingPercentage > 70) {
      return "warning";
    }

    return "success";
  };

  const progressStatus = getProgressStatus();

  return (
    <div className="expense-total-card">

      {/* =====================================
          HEADER
          ===================================== */}

      <div className="expense-total-header">

        <div className="expense-total-title-wrapper">
          <div className="expense-total-icon">
            <Wallet size={22} />
          </div>

          <div>
            <h2>Financial Summary</h2>

            <p>
              Track your income and spending
            </p>
          </div>
        </div>

        <div className="expense-update-status">

          {autoRefreshIndicator ? (
            <div className="summary-updated">
              <CheckCircle size={14} />
              Summary updated
            </div>
          ) : (
            <span>
              Last updated:{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}

          {loading && (
            <RefreshCw
              size={15}
              className="refresh-icon"
            />
          )}

        </div>
      </div>

      {/* =====================================
          SUMMARY CARDS
          ===================================== */}

      <div className="financial-summary-grid">

        {/* Income */}
        <div className="financial-summary-card income-card">

          <div>
            <span className="summary-label">
              Income
            </span>

            <strong>
              ₹{formatCurrency(safeIncome)}
            </strong>
          </div>

          <div className="summary-card-icon">
            <Wallet size={23} />
          </div>

        </div>

        {/* Current Month */}
        <div className="financial-summary-card month-card">

          <div>
            <span className="summary-label">
              {monthName} Expenses
            </span>

            <strong>
              ₹{formatCurrency(currentMonthTotal)}
            </strong>
          </div>

          <div className="summary-card-icon">
            <CalendarDays size={23} />
          </div>

        </div>

        {/* Total Expenses */}
        <div className="financial-summary-card expense-card">

          <div>
            <span className="summary-label">
              Total Expenses
            </span>

            <strong>
              ₹{formatCurrency(totalExpense)}
            </strong>
          </div>

          <div className="summary-card-icon">
            <Receipt size={23} />
          </div>

        </div>

        {/* Remaining */}
        <div className="financial-summary-card remaining-card">

          <div>
            <span className="summary-label">
              Remaining
            </span>

            <strong
              className={
                remainingMoney < 0
                  ? "negative-amount"
                  : ""
              }
            >
              ₹{formatCurrency(remainingMoney)}
            </strong>
          </div>

          <div className="summary-card-icon">
            <CreditCard size={23} />
          </div>

        </div>

      </div>

      {/* =====================================
          SPENDING PROGRESS
          ===================================== */}

      {safeIncome > 0 && (
        <div className="spending-progress-section">

          <div className="spending-progress-header">

            <div>
              <span>Spending Progress</span>
              <small>
                Total expenses compared to income
              </small>
            </div>

            <strong>
              {spendingPercentage.toFixed(1)}%
            </strong>

          </div>

          <div className="spending-progress-track">
            <div
              className={`spending-progress-fill ${progressStatus}`}
              style={{
                width: `${progressWidth}%`,
              }}
            />
          </div>

          <div className="spending-progress-footer">

            <span>
              Spent: ₹{formatCurrency(totalExpense)}
            </span>

            <span>
              Income: ₹{formatCurrency(safeIncome)}
            </span>

          </div>

        </div>
      )}

      {/* =====================================
          CATEGORY BREAKDOWN
          ===================================== */}

      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="category-breakdown">

          <div className="category-breakdown-header">
            <div>
              <h3>
                {monthName} Category Breakdown
              </h3>

              <p>
                See where your money is going
              </p>
            </div>

            <TrendingUp size={20} />
          </div>

          <div className="category-list">

            {Object.entries(categoryBreakdown)
              .sort(
                ([, first], [, second]) =>
                  second.total - first.total
              )
              .map(([category, data]) => (
                <div
                  key={category}
                  className="category-breakdown-item"
                >

                  <div className="category-name">
                    <span>
                      {CATEGORY_LABELS[category] ||
                        "Other"}
                    </span>

                    <small>
                      {data.count}{" "}
                      {data.count === 1
                        ? "transaction"
                        : "transactions"}
                    </small>
                  </div>

                  <strong>
                    ₹{formatCurrency(data.total)}
                  </strong>

                </div>
              ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default ExpenseTotal;