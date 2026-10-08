import { useState } from "react";
import "./BudgetPlanner.css";

const categories = [
  { id: "food", name: "Food", icon: "🍴" },
  { id: "medicines", name: "Medicines", icon: "💊" },
  { id: "travel", name: "Travel", icon: "🚌" },
  { id: "study", name: "Study", icon: "📖" },
  { id: "emergency", name: "Emergency", icon: "➕" },
  { id: "saving", name: "Saving / Investment", icon: "🐖" },
];

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function BudgetPlanner() {
  const [totalReceived, setTotalReceived] = useState("");
  const [expenses, setExpenses] = useState(
    categories.reduce((acc, cat) => {
      acc[cat.id] = days.reduce((dAcc, day) => {
        dAcc[day] = "";
        return dAcc;
      }, {});
      return acc;
    }, {})
  );

  const handleInputChange = (catId, day, value) => {
    if (value === "" || !isNaN(Number(value))) {
      setExpenses((prev) => ({
        ...prev,
        [catId]: {
          ...prev[catId],
          [day]: value,
        },
      }));
    }
  };

  const getRowTotal = (catId) => {
    return days.reduce((sum, day) => {
      const val = parseFloat(expenses[catId][day]) || 0;
      return sum + val;
    }, 0);
  };

  const totalSpent = categories.reduce((sum, cat) => {
    if (cat.id === "saving") return sum;
    return sum + getRowTotal(cat.id);
  }, 0);

  const savingTotal = getRowTotal("saving");
  const totalIncome = parseFloat(totalReceived) || 0;
  const remainingBalance = totalIncome - (totalSpent + savingTotal);
  const savingsRate = totalIncome > 0 ? ((savingTotal / totalIncome) * 100).toFixed(2) : "0.00";

  return (
    <div className="budget-planner-container">
      {/* Header */}
      <header className="planner-header">
        <div className="header-title-wrapper">
          <h1>Student Weekly Budget Planner</h1>
          <div className="title-underline"></div>
        </div>
        <div className="header-icon">📓🪙</div>
      </header>

      {/* Total Amount Received Section */}
      <section className="received-section">
        <div className="received-card">
          <div className="card-label-row">
            <span className="wallet-icon">👛</span>
            <label htmlFor="totalReceived">Total Amount Received (from Parents/Family)</label>
          </div>
          <div className="input-with-symbol">
            <span className="currency-symbol">₹</span>
            <input
              id="totalReceived"
              type="number"
              placeholder="Enter total amount received"
              value={totalReceived}
              onChange={(e) => setTotalReceived(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="table-section">
        <div className="table-responsive">
          <table className="budget-table">
            <thead>
              <tr>
                <th className="category-col">Category</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
                <th className="total-col">Weekly Total</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                const rowTotal = getRowTotal(cat.id);
                return (
                  <tr key={cat.id} className={cat.id === "saving" ? "saving-row" : ""}>
                    <td className="category-cell">
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-name">{cat.name}</span>
                    </td>
                    {days.map((day) => (
                      <td key={day} className="input-cell">
                        <input
                          type="number"
                          value={expenses[cat.id][day]}
                          onChange={(e) => handleInputChange(cat.id, day, e.target.value)}
                          placeholder=""
                        />
                      </td>
                    ))}
                    <td className="weekly-total-cell">₹ {rowTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary Cards Footer */}
      <footer className="summary-footer">
        <div className="summary-card">
          <div className="summary-icon blue">👛</div>
          <div className="summary-content">
            <span className="summary-title">Total Spent this week</span>
            <span className="summary-value">₹ {totalSpent.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">🌱</div>
          <div className="summary-content">
            <span className="summary-title">Remaining Balance</span>
            <span className="summary-value">₹ {remainingBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">📊</div>
          <div className="summary-content">
            <span className="summary-title">Savings Rate (%)</span>
            <span className="summary-value">{savingsRate} %</span>
          </div>
        </div>
      </footer>
    </div>
  );
}