import {
  List,
  Utensils,
  Pill,
  Bus,
  BookOpen,
  ShieldAlert,
  ShoppingBag,
  Trash2,
  RefreshCw,
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

const ExpenseList = ({ expenses = [], onDeleteExpense, loading = false }) => {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const getCategory = (category) => {
    return (
      categoryConfig[category] || {
        label: "Other",
        icon: Receipt,
      }
    );
  };

  const getAmount = (expense) => {
    return Number(expense.amount ?? expense.price ?? 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalExpenses = safeExpenses.reduce(
    (total, expense) => total + getAmount(expense),
    0
  );

  const handleDelete = (id) => {
    if (onDeleteExpense) {
      onDeleteExpense(id);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // Loading state
  if (loading && safeExpenses.length === 0) {
    return (
      <div className="expense-list-card">
        <div className="expense-loading">
          <RefreshCw className="loading-icon" size={32} />

          <h3>Loading expenses...</h3>

          <p>Please wait while we fetch your expense data.</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (safeExpenses.length === 0) {
    return (
      <div className="expense-list-card">
        <div className="expense-list-header">
          <div className="expense-list-title">
            <div className="expense-list-icon">
              <List size={22} />
            </div>

            <div>
              <h2>Recent Expenses</h2>
              <p>No transactions yet</p>
            </div>
          </div>

          <button
            className="expense-refresh-button"
            onClick={handleRefresh}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="expense-empty">
          <div className="expense-empty-icon">
            <Receipt size={40} />
          </div>

          <h3>No expenses yet!</h3>

          <p>
            Start tracking your expenses by adding your first expense above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-card">
      {/* Header */}
      <div className="expense-list-header">
        <div className="expense-list-title">
          <div className="expense-list-icon">
            <List size={22} />
          </div>

          <div>
            <h2>Recent Expenses</h2>
            <p>
              {safeExpenses.length}{" "}
              {safeExpenses.length === 1 ? "transaction" : "transactions"}
            </p>
          </div>
        </div>

        <div className="expense-list-total">
          <span>Total Spent</span>
          <strong>{formatCurrency(totalExpenses)}</strong>
        </div>
      </div>

      {/* Refresh */}
      <div className="expense-list-toolbar">
        <span>
          Showing your latest {safeExpenses.length}{" "}
          {safeExpenses.length === 1 ? "expense" : "expenses"}
        </span>

        <button
          className="expense-refresh-button"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={15} />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="expense-table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {safeExpenses.map((expense) => {
              const category = getCategory(expense.category);
              const CategoryIcon = category.icon;

              return (
                <tr key={expense.id}>
                  {/* Item */}
                  <td>
                    <div className="expense-item-info">
                      <div className="expense-category-icon">
                        <CategoryIcon size={18} />
                      </div>

                      <div>
                        <strong>
                          {expense.name || "Unnamed Expense"}
                        </strong>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="expense-category">
                      {category.label}
                    </span>
                  </td>

                  {/* Date */}
                  <td>
                    <span className="expense-date">
                      {formatDate(expense.date)}
                    </span>
                  </td>

                  {/* Amount */}
                  <td>
                    <strong className="expense-amount">
                      - {formatCurrency(getAmount(expense))}
                    </strong>
                  </td>

                  {/* Delete */}
                  <td>
                    <button
                      className="expense-delete-button"
                      onClick={() => handleDelete(expense.id)}
                      title="Delete expense"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Expense Cards */}
      <div className="expense-mobile-list">
        {safeExpenses.map((expense) => {
          const category = getCategory(expense.category);
          const CategoryIcon = category.icon;

          return (
            <div className="expense-mobile-item" key={expense.id}>
              <div className="expense-mobile-left">
                <div className="expense-category-icon">
                  <CategoryIcon size={18} />
                </div>

                <div>
                  <strong>
                    {expense.name || "Unnamed Expense"}
                  </strong>

                  <span>
                    {category.label} • {formatDate(expense.date)}
                  </span>
                </div>
              </div>

              <div className="expense-mobile-right">
                <strong>
                  - {formatCurrency(getAmount(expense))}
                </strong>

                <button
                  className="expense-delete-button"
                  onClick={() => handleDelete(expense.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseList;