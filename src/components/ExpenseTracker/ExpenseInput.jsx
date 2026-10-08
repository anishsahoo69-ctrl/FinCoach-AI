import { useState } from "react";
import {
  IndianRupee,
  Utensils,
  Pill,
  Bus,
  BookOpen,
  ShieldAlert,
  ShoppingBag,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./ExpenseInput.css";

const EXPENSE_CATEGORIES = [
  {
    value: "food",
    label: "Food",
    icon: Utensils,
  },
  {
    value: "medicines",
    label: "Medicines",
    icon: Pill,
  },
  {
    value: "travel",
    label: "Travel",
    icon: Bus,
  },
  {
    value: "study",
    label: "Study",
    icon: BookOpen,
  },
  {
    value: "emergency",
    label: "Emergency",
    icon: ShieldAlert,
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
  },
];

const ExpenseInput = ({ onAddExpense }) => {
  const [price, setPrice] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState("food");

  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setSubmitError("");
    setSuccessMessage("");

    // Validate amount
    const parsedPrice = Number.parseFloat(price);

    if (
      !price ||
      Number.isNaN(parsedPrice) ||
      parsedPrice <= 0
    ) {
      setSubmitError(
        "Please enter a valid amount greater than ₹0."
      );
      return;
    }

    // Validate expense name
    if (!expenseName.trim()) {
      setSubmitError("Please enter an expense name.");
      return;
    }

    const expenseData = {
      id: Date.now(),
      name: expenseName.trim(),
      amount: parsedPrice,
      price: parsedPrice,
      category,
      date: new Date().toISOString(),
    };

    try {
      setLoading(true);

      // Send expense to parent component
      if (onAddExpense) {
        await onAddExpense(expenseData);
      }

      // Reset form
      setPrice("");
      setExpenseName("");
      setCategory("food");

      setSuccessMessage("Expense added successfully!");

      // Remove success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch {
      setSubmitError(
        "Failed to add expense. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-input-card">

      {/* Header */}
      <div className="expense-input-header">
        <div className="expense-input-title-wrapper">
          <div className="expense-input-icon">
            <Plus size={22} />
          </div>

          <div>
            <h2>Add Expense</h2>
            <p>Record your spending and track your budget.</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="expense-message error">
          <AlertCircle size={18} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="expense-message success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={submit}>

        <div className="expense-input-grid">

          {/* Expense Name */}
          <div className="expense-form-group">
            <label htmlFor="expense-name">
              Expense Name
            </label>

            <input
              id="expense-name"
              type="text"
              value={expenseName}
              onChange={(e) =>
                setExpenseName(e.target.value)
              }
              placeholder="e.g. Groceries, Coffee"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="expense-form-group">
            <label htmlFor="expense-category">
              Category
            </label>

            <div className="expense-select-wrapper">
              <select
                id="expense-category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                disabled={loading}
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option
                    key={cat.value}
                    value={cat.value}
                  >
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="expense-form-group">
            <label htmlFor="expense-amount">
              Amount
            </label>

            <div className="expense-amount-wrapper">
              <span className="expense-currency">
                <IndianRupee size={17} />
              </span>

              <input
                id="expense-amount"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="0.00"
                disabled={loading}
              />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-expense-button"
          disabled={loading}
        >
          {loading ? (
            "Adding..."
          ) : (
            <>
              <Plus size={20} />
              Add Expense
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default ExpenseInput;