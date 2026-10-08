import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CirclePlus,
  Pencil,
  Target,
  Trash2,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import "./FinancialGoals.css";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const FinancialGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinance();

  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    savedAmount: "",
    deadline: "",
  });

  const [editingGoalId, setEditingGoalId] = useState(null);

  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount || 0), 0);
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount || 0), 0);
  const overallProgress = totalTarget ? (totalSaved / totalTarget) * 100 : 0;

  const chartData = useMemo(
    () =>
      goals.map((goal) => ({
        name: goal.name,
        target: Number(goal.targetAmount || 0),
        saved: Number(goal.savedAmount || 0),
      })),
    [goals]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const targetAmount = Number(form.targetAmount);
    const savedAmount = Number(form.savedAmount);

    if (!form.name || targetAmount <= 0 || savedAmount < 0) {
      return;
    }

    if (editingGoalId) {
      updateGoal(editingGoalId, {
        name: form.name,
        targetAmount,
        savedAmount: Math.min(savedAmount, targetAmount),
        deadline: form.deadline,
      });
      setEditingGoalId(null);
    } else {
      addGoal({
        name: form.name,
        targetAmount,
        savedAmount: Math.min(savedAmount, targetAmount),
        deadline: form.deadline,
      });
    }

    setForm({
      name: "",
      targetAmount: "",
      savedAmount: "",
      deadline: "",
    });
  };

  const handleEdit = (goal) => {
    setEditingGoalId(goal.id);
    setForm({
      name: goal.name,
      targetAmount: String(goal.targetAmount),
      savedAmount: String(goal.savedAmount),
      deadline: goal.deadline,
    });
  };

  const handleAddSavings = (goalId) => {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) return;

    const newAmount = Number(window.prompt("How much would you like to add?", "500"));
    if (!Number.isFinite(newAmount) || newAmount <= 0) return;

    const nextSaved = Math.min(Number(goal.savedAmount || 0) + newAmount, Number(goal.targetAmount || 0));
    updateGoal(goalId, { savedAmount: nextSaved });
  };

  return (
    <div className="goals-page">
      <header className="page-header">
        <div>
          <p className="page-kicker">FINCOACH AI</p>
          <h1>Financial Goals</h1>
          <p className="page-subtitle">Set meaningful goals and track your progress every month.</p>
        </div>
      </header>

      <section className="summary-grid">
        <div className="summary-card goals-card">
          <div className="summary-icon"><Target size={20} /></div>
          <div>
            <span>Total Goals</span>
            <strong>{goals.length}</strong>
          </div>
        </div>

        <div className="summary-card target-card">
          <div className="summary-icon"><Target size={20} /></div>
          <div>
            <span>Total Target</span>
            <strong>{formatCurrency(totalTarget)}</strong>
          </div>
        </div>

        <div className="summary-card saved-card">
          <div className="summary-icon"><CirclePlus size={20} /></div>
          <div>
            <span>Total Saved</span>
            <strong>{formatCurrency(totalSaved)}</strong>
          </div>
        </div>

        <div className="summary-card progress-card">
          <div className="summary-icon"><Target size={20} /></div>
          <div>
            <span>Overall Progress</span>
            <strong>{overallProgress.toFixed(0)}%</strong>
          </div>
        </div>
      </section>

      <section className="goals-content">
        <div className="panel-card">
          <div className="section-heading">
            <h2>{editingGoalId ? "Edit Goal" : "Add Goal"}</h2>
          </div>

          <form className="goal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Goal Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Emergency Fund" required />
            </div>

            <div className="form-group">
              <label>Target Amount</label>
              <input type="number" name="targetAmount" value={form.targetAmount} onChange={handleChange} min="1" required />
            </div>

            <div className="form-group">
              <label>Current Saved Amount</label>
              <input type="number" name="savedAmount" value={form.savedAmount} onChange={handleChange} min="0" required />
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required />
            </div>

            <button type="submit" className="primary-button">
              {editingGoalId ? "Save Changes" : "Add Goal"}
            </button>
          </form>
        </div>

        <div className="panel-card chart-card">
          <div className="section-heading">
            <h2>Goal Progress</h2>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="target" fill="#e2e8f0" radius={[8, 8, 0, 0]} />
                <Bar dataKey="saved" fill="#6663e6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="goal-list panel-card">
        <div className="section-heading">
          <h2>Goals</h2>
        </div>

        <div className="goal-grid">
          {goals.length === 0 ? (
            <div className="empty-state">No goals added yet. Start with one meaningful financial target.</div>
          ) : (
            goals.map((goal) => {
              const progress = Number(goal.targetAmount || 0)
                ? (Number(goal.savedAmount || 0) / Number(goal.targetAmount || 1)) * 100
                : 0;
              const remaining = Math.max(Number(goal.targetAmount || 0) - Number(goal.savedAmount || 0), 0);

              return (
                <div key={goal.id} className="goal-card">
                  <div className="goal-head">
                    <div>
                      <h3>{goal.name}</h3>
                      <p>{new Date(goal.deadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                    </div>
                    <span className="progress-badge">{Math.min(progress, 100).toFixed(0)}%</span>
                  </div>

                  <div className="goal-values">
                    <div>
                      <span>Target</span>
                      <strong>{formatCurrency(goal.targetAmount)}</strong>
                    </div>
                    <div>
                      <span>Saved</span>
                      <strong>{formatCurrency(goal.savedAmount)}</strong>
                    </div>
                    <div>
                      <span>Remaining</span>
                      <strong>{formatCurrency(remaining)}</strong>
                    </div>
                  </div>

                  <div className="goal-progress-track">
                    <div className="goal-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>

                  <div className="goal-actions">
                    <button type="button" className="secondary-button" onClick={() => handleAddSavings(goal.id)}>
                      Add Savings
                    </button>
                    <button type="button" className="secondary-button" onClick={() => handleEdit(goal)}>
                      <Pencil size={15} /> Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => deleteGoal(goal.id)}>
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default FinancialGoals;
