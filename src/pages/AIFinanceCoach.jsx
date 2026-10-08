import { useMemo, useState } from "react";
import {
  Bot,
  BrainCircuit,
  Coins,
  Lightbulb,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import "./AIFinanceCoach.css";

const quickQuestions = [
  "How can I save more?",
  "Where am I spending the most?",
  "Am I within my budget?",
  "How much should I save this month?",
];

const tips = [
  {
    icon: Wallet,
    title: "Follow the 50/30/20 rule",
    text: "Keep needs under 50%, wants under 30%, and savings under 20% of your income.",
  },
  {
    icon: PiggyBank,
    title: "Build an emergency fund",
    text: "Try to save at least 3 to 6 months of essential expenses for financial safety.",
  },
  {
    icon: TrendingDown,
    title: "Track daily expenses",
    text: "Recording small daily spends helps you notice patterns before they grow too large.",
  },
  {
    icon: Coins,
    title: "Save before spending",
    text: "Automate savings early in the month so your goals are funded before discretionary spending.",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const AIFinanceCoach = () => {
  const {
    income,
    expenses,
    budget,
    totalExpenses,
    remainingBudget,
    totalSavings,
    profile,
  } = useFinance();

  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi! I can help you review your spending habits and savings plan.",
    },
  ]);

  const savingsRate = income > 0 ? ((totalSavings / income) * 100).toFixed(1) : "0.0";

  const topCategory = useMemo(() => {
    if (!expenses.length) return "No data yet";

    const categoryTotals = expenses.reduce((acc, item) => {
      const key = item.category || "Other";
      acc[key] = (acc[key] || 0) + Number(item.amount || 0);
      return acc;
    }, {});

    return Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  }, [expenses]);

  const insights = [
    {
      icon: TrendingUp,
      title: "Savings health",
      message:
        Number(savingsRate) >= 30
          ? "Great job! Your savings rate is healthy and above the recommended level."
          : "Your savings rate could be stronger. Try reducing discretionary spending and increasing automatic savings.",
      priority: Number(savingsRate) >= 30 ? "High" : "Medium",
    },
    {
      icon: Wallet,
      title: "Budget status",
      message:
        budget > 0 && totalExpenses > budget * 0.8
          ? "You are close to your monthly budget limit. Keep spending under control this month."
          : "Your budget is still in a healthy range. You have room to keep spending controlled.",
      priority: budget > 0 && totalExpenses > budget * 0.8 ? "High" : "Low",
    },
    {
      icon: Coins,
      title: "Top category",
      message:
        Array.isArray(topCategory) && topCategory[0] !== "No data yet"
          ? `${topCategory[0]} is your biggest spending category. Set a weekly cap to reduce unnecessary costs.`
          : "Start adding expenses to receive personalized financial insights.",
      priority: Array.isArray(topCategory) && topCategory[0] !== "No data yet" ? "Medium" : "Low",
    },
    {
      icon: Lightbulb,
      title: "Action tip",
      message:
        remainingBudget <= 0
          ? "You have used your current budget. Consider pausing non-essential purchases for the rest of the month."
          : "You still have room in your budget. Use it to boost savings or improve your emergency fund.",
      priority: remainingBudget <= 0 ? "High" : "Medium",
    },
  ];

  const getAnswer = (prompt) => {
    const cleaned = prompt.toLowerCase();

    if (cleaned.includes("save") || cleaned.includes("saving")) {
      return `You are saving ${formatCurrency(totalSavings)} this month. A strong target is to keep at least 20% of your income in savings.`;
    }

    if (cleaned.includes("spend") || cleaned.includes("where")) {
      return topCategory && Array.isArray(topCategory) && topCategory[0] !== "No data yet"
        ? `Your highest spending category is ${topCategory[0]} with about ${formatCurrency(topCategory[1])}. Consider setting a limit for that category.`
        : "Start adding expenses to see which categories are costing the most.";
    }

    if (cleaned.includes("budget")) {
      return `Your monthly budget is ${formatCurrency(budget)} and you have used ${formatCurrency(totalExpenses)}. Remaining budget is ${formatCurrency(remainingBudget)}.`;
    }

    if (cleaned.includes("amount") || cleaned.includes("save this month")) {
      return `A good monthly savings target for you is ${formatCurrency(Math.max(income * 0.2, 0))}.`;
    }

    return `Based on your current data, your income is ${formatCurrency(income)}, monthly expenses are ${formatCurrency(totalExpenses)}, and your savings rate is ${savingsRate}%.`;
  };

  const handleAskCoach = () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setChatMessages((previous) => [
      ...previous,
      { type: "user", text: trimmed },
      { type: "bot", text: getAnswer(trimmed) },
    ]);

    setQuestion("");
  };

  const handleQuickQuestion = (item) => {
    setQuestion(item);
    setChatMessages((previous) => [
      ...previous,
      { type: "user", text: item },
      { type: "bot", text: getAnswer(item) },
    ]);
  };

  return (
    <div className="ai-coach-page">
      <header className="ai-coach-header">
        <div>
          <p className="page-kicker">FINCOACH AI</p>
          <h1>AI Finance Coach</h1>
          <p className="page-subtitle">Your personal financial assistant for smarter money decisions.</p>
        </div>
        <div className="coach-icon-wrap">
          <BrainCircuit size={32} />
        </div>
      </header>

      <section className="summary-grid">
        <div className="summary-card income-card">
          <div className="summary-icon"><Wallet size={20} /></div>
          <div>
            <span>Monthly Income</span>
            <strong>{formatCurrency(income)}</strong>
          </div>
        </div>

        <div className="summary-card expense-card">
          <div className="summary-icon"><TrendingDown size={20} /></div>
          <div>
            <span>Monthly Expenses</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
          </div>
        </div>

        <div className="summary-card savings-card">
          <div className="summary-icon"><PiggyBank size={20} /></div>
          <div>
            <span>Remaining Money</span>
            <strong>{formatCurrency(remainingBudget)}</strong>
          </div>
        </div>

        <div className="summary-card rate-card">
          <div className="summary-icon"><TrendingUp size={20} /></div>
          <div>
            <span>Savings Rate</span>
            <strong>{savingsRate}%</strong>
          </div>
        </div>
      </section>

      <section className="ai-coach-content">
        <div className="insights-panel">
          <div className="panel-header">
            <h2>AI Insights</h2>
          </div>

          <div className="insight-list">
            {insights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="insight-card">
                  <div className="insight-icon">
                    <Icon size={18} />
                  </div>
                  <div className="insight-copy">
                    <div className="insight-topline">
                      <h3>{item.title}</h3>
                      <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
                    </div>
                    <p>{item.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat-panel">
          <div className="panel-header">
            <h2>Ask FinCoach</h2>
          </div>

          <div className="quick-question-list">
            {quickQuestions.map((item) => (
              <button key={item} type="button" className="quick-question" onClick={() => handleQuickQuestion(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="chat-box">
            {chatMessages.map((message, index) => (
              <div key={`${message.type}-${index}`} className={`chat-message ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask FinCoach anything about your money..."
            />
            <button type="button" onClick={handleAskCoach}>
              Ask <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="tips-panel">
        <div className="panel-header">
          <h2>Financial Tips</h2>
        </div>

        <div className="tips-grid">
          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <div key={tip.title} className="tip-card">
                <div className="tip-icon"><Icon size={18} /></div>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AIFinanceCoach;
