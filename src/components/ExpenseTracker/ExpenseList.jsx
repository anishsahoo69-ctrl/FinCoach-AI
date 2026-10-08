import {
  Utensils,
  Pill,
  Bus,
  BookOpen,
  ShieldAlert,
  ShoppingBag,
  Wallet,
  Trash2,
  Receipt,
} from "lucide-react";
import "./ExpenseList.css";

const categoryConfig = {
  food: {
    label: "Food",
    icon: Utensils,
  },
  medicines: {
    label: "Medicines",
    icon: Pill,
  },
  travel: {
    label: "Travel",
    icon: Bus,
  },
  study: {
    label: "Study",
    icon: BookOpen,
  },
  emergency: {
    label: "Emergency",
    icon: ShieldAlert,
  },
  shopping: {
    label: "Shopping",
    icon: ShoppingBag,
  },
};

const ExpenseList = ({ expenses = [], onDeleteExpense }) => {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const getCategory = (category) => {
    return (
      categoryConfig[category] || {
        label: "Other",
        icon: Receipt,
      }
    );
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    const expenseDate = new Date(date);

    if (Number.isNaN(expenseDate.getTime())) {
      return "Invalid date";
    }

    return expenseDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getAmount = (expense) => {
    const amount = Number.parseFloat(
      expense.amount ?? expense.price
    );

    return Number.isNaN(amount) ? 0 : amount;
  };

  const totalExpenses = safeExpenses.reduce(
    (total, expense) => total + getAmount(expense),
    0
  );

  return (
    <div className="expense-list-card">

      {/* Header */}
      <div className="expense-list-header">
        <div className="expense-list-title-wrapper">
          <div className="expense-list-icon">
            <Receipt size={22} />
          </div>

          <div>
            <h2>Recent Expenses</h2>
            <p>
              {safeExpenses.length}{" "}
              {safeExpenses.length === 1
                ? "expense"
                : "expenses"}{" "}
              recorded
            </p>
          </div>
        </div>

        <div className="expense-total">
          <span>Total Spent</span>
          <strong>
            ₹{totalExpenses.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>
      </div>

      {/* Empty State */}
      {safeExpenses.length === 0 ? (
        <div className="expense-empty-state">
          <div className="expense-empty-icon">
            <Wallet size={30} />
          </div>

          <h3>No expenses yet</h3>

          <p>
            Start tracking your spending by adding your
            first expense.
          </p>
        </div>
      ) : (
        <div className="expense-list">

          {safeExpenses.map((expense, index) => {
            const category = getCategory(expense.category);
            const CategoryIcon = category.icon;
            const amount = getAmount(expense);

            return (
              <div
                className="expense-list-item"
                key={expense.id ?? `${expense.date}-${index}`}
              >

                {/* Category Icon */}
                <div className="expense-category-icon">
                  <CategoryIcon size={20} />
                </div>

                {/* Expense Information */}
                <div className="expense-details">
                  <h3>
                    {expense.name || "Unnamed Expense"}
                  </h3>

                  <div className="expense-meta">
                    <span>{category.label}</span>
                    <span className="expense-dot">•</span>
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="expense-amount">
                  <strong>
                    -₹
                    {amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                {/* Delete Button */}
                {onDeleteExpense && (
                  <button
                    type="button"
                    className="delete-expense-button"
                    onClick={() =>
                      onDeleteExpense(expense.id)
                    }
                    title="Delete expense"
                  >
                    <Trash2 size={17} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;