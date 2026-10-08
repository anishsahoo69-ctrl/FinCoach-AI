import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  Lightbulb,
} from "lucide-react";
import "./Analytics.css";

const monthlyData = [
  { month: "May", income: 30000, expenses: 16500 },
  { month: "Jun", income: 32000, expenses: 17200 },
  { month: "Jul", income: 34000, expenses: 18100 },
  { month: "Aug", income: 35000, expenses: 19000 },
  { month: "Sep", income: 35000, expenses: 18750 },
  { month: "Oct", income: 35000, expenses: 18200 },
];

const weeklyData = [
  { week: "Week 1", spending: 4200 },
  { week: "Week 2", spending: 5100 },
  { week: "Week 3", spending: 3900 },
  { week: "Week 4", spending: 5000 },
];

const categoryData = [
  { name: "Food", value: 5200 },
  { name: "Medicines", value: 1800 },
  { name: "Travel", value: 3600 },
  { name: "Study", value: 2200 },
  { name: "Emergency", value: 1200 },
  { name: "Shopping", value: 4200 },
];

const pieColors = [
  "#6663e6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const savingsData = monthlyData.map((item) => ({
  month: item.month,
  savings: item.income - item.expenses,
}));

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Analytics = () => {
  const totalIncome = 35000;
  const totalExpenses = 18200;
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);
  const monthlyBudget = 25000;
  const budgetUsed = totalExpenses;
  const budgetPercentage = Math.min((budgetUsed / monthlyBudget) * 100, 100);
  const remainingBudget = monthlyBudget - budgetUsed;

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <div>
          <p className="analytics-label">FINCOACH AI</p>
          <h1>Financial Analytics</h1>
          <p>
            Understand your spending, savings, and financial progress at a glance.
          </p>
        </div>
      </header>

      <section className="analytics-kpi-grid">
        <div className="analytics-kpi-card income-card">
          <div className="analytics-kpi-icon">
            <IndianRupee size={22} />
          </div>
          <div>
            <span>Total Income</span>
            <h2>{formatINR(totalIncome)}</h2>
          </div>
        </div>

        <div className="analytics-kpi-card expense-card">
          <div className="analytics-kpi-icon">
            <TrendingDown size={22} />
          </div>
          <div>
            <span>Total Expenses</span>
            <h2>{formatINR(totalExpenses)}</h2>
          </div>
        </div>

        <div className="analytics-kpi-card savings-card">
          <div className="analytics-kpi-icon">
            <PiggyBank size={22} />
          </div>
          <div>
            <span>Total Savings</span>
            <h2>{formatINR(totalSavings)}</h2>
          </div>
        </div>

        <div className="analytics-kpi-card rate-card">
          <div className="analytics-kpi-icon">
            <TrendingUp size={22} />
          </div>
          <div>
            <span>Savings Rate</span>
            <h2>{savingsRate}%</h2>
          </div>
        </div>
      </section>

      <section className="analytics-chart-grid">
        <div className="analytics-card analytics-wide-card">
          <div className="analytics-card-header">
            <div>
              <h3>Monthly Income vs Expenses</h3>
              <p>Comparison of income and spending by month.</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(Number(value))} />
                <Legend />
                <Bar dataKey="income" name="Income" radius={[6, 6, 0, 0]} fill="#6663e6" />
                <Bar dataKey="expenses" name="Expenses" radius={[6, 6, 0, 0]} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Weekly Spending</h3>
              <p>Your spending trend this month.</p>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="spending"
                  name="Spending"
                  stroke="#6663e6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Spending by Category</h3>
              <p>Where your money is going.</p>
            </div>
          </div>
          <div className="chart-container pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatINR(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card analytics-wide-card">
          <div className="analytics-card-header">
            <div>
              <h3>Savings Growth</h3>
              <p>Monthly savings based on income minus expenses.</p>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatINR(Number(value))} />
                <Area
                  type="monotone"
                  dataKey="savings"
                  name="Savings"
                  fill="#6663e6"
                  stroke="#4f46e5"
                  fillOpacity={0.25}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="analytics-bottom-grid">
        <div className="analytics-card budget-analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3>Monthly Budget</h3>
              <p>Your current budget performance.</p>
            </div>
            <Target size={24} />
          </div>

          <div className="budget-analytics-values">
            <div>
              <span>Budget</span>
              <strong>{formatINR(monthlyBudget)}</strong>
            </div>
            <div>
              <span>Spent</span>
              <strong>{formatINR(budgetUsed)}</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>{formatINR(Math.max(remainingBudget, 0))}</strong>
            </div>
          </div>

          <div className="analytics-progress">
            <div className="analytics-progress-top">
              <span>Budget Used</span>
              <strong>{budgetPercentage.toFixed(0)}%</strong>
            </div>
            <div className="analytics-progress-track">
              <div
                className="analytics-progress-fill"
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="analytics-card ai-insight-card">
          <div className="ai-insight-icon">
            <Lightbulb size={24} />
          </div>
          <div>
            <p className="ai-insight-label">FINCOACH AI INSIGHT</p>
            <h3>Your spending is under control.</h3>
            <p>
              You are currently saving {savingsRate}% of your income. Consider keeping your travel and shopping expenses within their planned limits to improve your monthly savings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
