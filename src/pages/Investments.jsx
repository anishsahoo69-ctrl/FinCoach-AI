import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Coins,
  Landmark,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import "./Investments.css";

const investmentTypes = [
  {
    name: "Mutual Funds",
    icon: BriefcaseBusiness,
    description: "Diversified long-term investments for steady growth.",
  },
  { name: "Stocks", icon: TrendingUp, description: "Equity investments with market risk and growth potential." },
  { name: "ETFs", icon: Wallet, description: "Low-cost diversified baskets for a broader market exposure." },
  { name: "Gold", icon: Coins, description: "A defensive asset that helps balance risk in a portfolio." },
  { name: "Fixed Deposits", icon: Landmark, description: "Stable returns with predictable cash flow and low risk." },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const Investments = () => {
  const { investments, addInvestment, deleteInvestment } = useFinance();
  const [form, setForm] = useState({
    name: "",
    type: "Mutual Funds",
    amount: "",
    returnRate: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const totalInvested = investments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const currentValue = investments.reduce(
    (sum, item) => sum + Number(item.amount || 0) * (1 + Number(item.returnRate || 0) / 100),
    0
  );
  const estimatedReturns = currentValue - totalInvested;

  const chartData = useMemo(
    () =>
      investmentTypes
        .map((type) => ({
          name: type.name,
          value: investments
            .filter((entry) => entry.type === type.name)
            .reduce((sum, item) => sum + Number(item.amount || 0), 0),
        }))
        .filter((item) => item.value > 0),
    [investments]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);
    const returnRate = Number(form.returnRate);

    if (!form.name || !form.type || !form.date || amount <= 0 || returnRate < 0) {
      return;
    }

    addInvestment({
      name: form.name,
      type: form.type,
      amount,
      returnRate,
      date: form.date,
    });

    setForm({
      name: "",
      type: "Mutual Funds",
      amount: "",
      returnRate: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="investments-page">
      <header className="page-header">
        <div>
          <p className="page-kicker">FINCOACH AI</p>
          <h1>Investments</h1>
          <p className="page-subtitle">A simple, student-friendly view of your investment portfolio.</p>
        </div>
      </header>

      <section className="summary-grid">
        <div className="summary-card invested-card">
          <div className="summary-icon"><CircleDollarSign size={20} /></div>
          <div>
            <span>Total Invested</span>
            <strong>{formatCurrency(totalInvested)}</strong>
          </div>
        </div>

        <div className="summary-card value-card">
          <div className="summary-icon"><ArrowUpRight size={20} /></div>
          <div>
            <span>Current Value</span>
            <strong>{formatCurrency(currentValue)}</strong>
          </div>
        </div>

        <div className="summary-card returns-card">
          <div className="summary-icon"><TrendingUp size={20} /></div>
          <div>
            <span>Estimated Returns</span>
            <strong>{formatCurrency(estimatedReturns)}</strong>
          </div>
        </div>

        <div className="summary-card count-card">
          <div className="summary-icon"><Wallet size={20} /></div>
          <div>
            <span>Number of Investments</span>
            <strong>{investments.length}</strong>
          </div>
        </div>
      </section>

      <section className="investment-types-section">
        <div className="section-heading">
          <h2>Investment Types</h2>
        </div>
        <div className="type-grid">
          {investmentTypes.map((type) => {
            const Icon = type.icon;
            const amount = investments
              .filter((item) => item.type === type.name)
              .reduce((sum, item) => sum + Number(item.amount || 0), 0);

            return (
              <div key={type.name} className="type-card">
                <div className="type-icon"><Icon size={18} /></div>
                <h3>{type.name}</h3>
                <strong>{formatCurrency(amount)}</strong>
                <p>{type.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="investment-content">
        <div className="panel-card">
          <div className="section-heading">
            <h2>Add Investment</h2>
          </div>

          <form className="investment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Investment Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Emergency Fund" required />
            </div>

            <div className="form-group">
              <label>Investment Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {investmentTypes.map((type) => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} min="1" placeholder="Enter amount" required />
            </div>

            <div className="form-group">
              <label>Expected Return %</label>
              <input type="number" name="returnRate" value={form.returnRate} onChange={handleChange} min="0" step="0.1" placeholder="e.g. 8.5" required />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>

            <button type="submit" className="primary-button">Add Investment</button>
          </form>
        </div>

        <div className="panel-card chart-card">
          <div className="section-heading">
            <h2>Investment Overview</h2>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="value" fill="#6663e6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="list-panel panel-card">
        <div className="section-heading">
          <h2>Investment List</h2>
        </div>

        <div className="investment-list">
          {investments.length === 0 ? (
            <div className="empty-state">No investments yet. Add your first investment to track growth.</div>
          ) : (
            investments.map((investment) => (
              <div key={investment.id} className="investment-row">
                <div className="investment-details">
                  <strong>{investment.name}</strong>
                  <span>{investment.type}</span>
                </div>
                <div className="investment-metric"><label>Invested</label><strong>{formatCurrency(investment.amount)}</strong></div>
                <div className="investment-metric"><label>Return %</label><strong>{investment.returnRate}%</strong></div>
                <div className="investment-metric"><label>Date</label><strong>{new Date(investment.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</strong></div>
                <button type="button" className="delete-button" onClick={() => deleteInvestment(investment.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="education-panel panel-card">
        <div className="section-heading">
          <h2>Before You Invest</h2>
        </div>
        <div className="education-grid">
          <div className="education-item"><ShieldCheck size={18} /><span>Understand risk before choosing an investment.</span></div>
          <div className="education-item"><Wallet size={18} /><span>Diversify across asset types to reduce volatility.</span></div>
          <div className="education-item"><ArrowUpRight size={18} /><span>Invest according to your goals and timeline.</span></div>
          <div className="education-item"><Coins size={18} /><span>Avoid investing money you may need immediately.</span></div>
        </div>
      </section>
    </div>
  );
};

export default Investments;
