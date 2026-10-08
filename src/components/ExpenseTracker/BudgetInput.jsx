import  { useState } from "react";
import { Wallet, Check } from "lucide-react";
import "./BudgetInput.css";

const BudgetInput = () => {
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(0);

  const handleBudgetChange = (e) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setBudget("");
      return;
    }

    // Only allow valid numbers
    const numericValue = Number.parseFloat(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setBudget(value);
    }
  };

  const handleSetBudget = () => {
    const numericBudget = Number.parseFloat(budget);

    if (!isNaN(numericBudget) && numericBudget > 0) {
      setSavedBudget(numericBudget);
    }
  };

  return (
    <div className="budget-input-card">

      {/* Header */}
      <div className="budget-input-header">

        <div className="budget-input-icon">
          <Wallet size={22} />
        </div>

        <div>
          <h3>Monthly Budget Limit</h3>

          <p>
            Set a monthly spending limit to stay on track.
          </p>
        </div>

      </div>

      {/* Input */}
      <div className="budget-input-wrapper">

        <span className="budget-currency">₹</span>

        <input
          type="number"
          min="0"
          placeholder="Enter monthly budget"
          value={budget}
          onChange={handleBudgetChange}
        />

      </div>

      {/* Button */}
      <button
        className="set-budget-button"
        onClick={handleSetBudget}
      >
        <Check size={17} />
        Set Monthly Budget
      </button>

      {/* Saved Budget */}
      {savedBudget > 0 && (
        <div className="budget-saved-message">
          <Check size={17} />

          <span>
            Monthly budget set to{" "}
            <strong>
              ₹{savedBudget.toLocaleString("en-IN")}
            </strong>
          </span>
        </div>
      )}

    </div>
  );
};

export default BudgetInput;