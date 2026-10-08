import { useState } from "react";
import {
  Wallet,
  IndianRupee,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./IncomeInput.css";

const IncomeInput = ({ income = 0, onIncomeChange }) => {
  const [incomeValue, setIncomeValue] = useState(
    income ? String(income) : ""
  );

  const [savedIncome, setSavedIncome] = useState(
    income || 0
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleIncomeChange = (e) => {
    const value = e.target.value;

    setIncomeValue(value);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedIncome = Number.parseFloat(incomeValue);

    // Validate income
    if (
      !incomeValue ||
      Number.isNaN(parsedIncome) ||
      parsedIncome <= 0
    ) {
      setError(
        "Please enter a valid monthly income greater than ₹0."
      );
      return;
    }

    // Update parent component
    if (onIncomeChange) {
      onIncomeChange(parsedIncome);
    }

    setSavedIncome(parsedIncome);
    setSuccess(true);
    setError("");

    // Hide success message
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="income-input-card">

      {/* Header */}
      <div className="income-input-header">

        <div className="income-input-title-wrapper">

          <div className="income-input-icon">
            <Wallet size={22} />
          </div>

          <div>
            <h2>Monthly Income</h2>

            <p>
              Set your monthly income to track spending
            </p>
          </div>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="income-message error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="income-message success">
          <CheckCircle size={18} />
          <span>
            Monthly income updated successfully!
          </span>
        </div>
      )}

      {/* Form */}
      <form
        className="income-input-form"
        onSubmit={handleSubmit}
      >

        <div className="income-form-group">

          <label htmlFor="monthly-income">
            Monthly Income
          </label>

          <div className="income-input-wrapper">

            <span className="income-currency">
              <IndianRupee size={18} />
            </span>

            <input
              id="monthly-income"
              type="number"
              min="0"
              step="0.01"
              value={incomeValue}
              onChange={handleIncomeChange}
              placeholder="e.g. 35000"
            />

          </div>

        </div>

        <button
          type="submit"
          className="set-income-button"
        >
          Set Income
        </button>

      </form>

      {/* Current Income */}
      {savedIncome > 0 && (
        <div className="current-income">

          <span>Current Monthly Income</span>

          <strong>
            ₹
            {Number(savedIncome).toLocaleString(
              "en-IN"
            )}
          </strong>

        </div>
      )}

    </div>
  );
};

export default IncomeInput;