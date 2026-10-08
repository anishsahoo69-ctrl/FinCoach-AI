import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  CreditCard,
  ShoppingBag,
  Coffee,
  Home,
  ChevronRight,
} from "lucide-react";

import "./Dashboard.css";


// =========================================
// STAT CARD
// =========================================

const StatCard = (props) => {
  const { title, value, change, icon: ComponentIcon, type } = props;

  return (
    <div className={`dashboard-stat-card ${type}`}>

      <div className="stat-card-top">

        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">
          {ComponentIcon && <ComponentIcon size={22} />}
        </div>

      </div>

      <div className="stat-change">
        {type === "expense" ? (
          <ArrowDownRight size={16} />
        ) : (
          <ArrowUpRight size={16} />
        )}

        <span>{change}</span>

      </div>

    </div>
  );
};


// =========================================
// TRANSACTION
// =========================================

const Transaction = (props) => {
  const { icon: ComponentIcon, title, category, date, amount, type } = props;

  return (
    <div className="transaction">

      <div className="transaction-left">

        <div className={`transaction-icon ${type}`}>
          {ComponentIcon && <ComponentIcon size={19} />}
        </div>

        <div>
          <h4>{title}</h4>
          <p>
            {category} • {date}
          </p>
        </div>

      </div>

      <span className={`transaction-amount ${type}`}>
        {type === "income" ? "+" : "-"}₹{amount}
      </span>

    </div>
  );
};


// =========================================
// DASHBOARD
// =========================================

const Dashboard = () => {

  return (

    <div className="dashboard-page">

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside className="dashboard-sidebar">

        {/* Logo */}

        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            ₹
          </div>

          <span>
            FinCoach AI
          </span>

        </div>


        {/* Navigation */}
        <nav className="sidebar-nav">

          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>

          <Link to="/budget-planner" className="sidebar-link">
            Budget Planner
          </Link>

          <Link to="/expense-tracker" className="sidebar-link">
            Expense Tracker
          </Link>

          <Link to="/analytics" className="sidebar-link">
            Analytics
          </Link>

          <Link to="/ai-finance-coach" className="sidebar-link">
            AI Finance Coach
          </Link>

          <Link to="/investments" className="sidebar-link">
            Investments
          </Link>

          <Link to="/financial-goals" className="sidebar-link">
            Financial Goals
          </Link>

          <Link to="/profile" className="sidebar-link">
            Profile
          </Link>

        </nav>


        {/* Bottom */}

        <div className="sidebar-bottom">

          <a
            href="#profile"
            className="nav-item"
          >
            <div className="profile-small">
              A
            </div>

            <div>
              <strong>Anish</strong>
              <span>My Profile</span>
            </div>

          </a>

        </div>

      </aside>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="dashboard-main">


        {/* =====================================
            HEADER
        ====================================== */}

        <header className="dashboard-header">

          <div>

            <p className="dashboard-greeting">
              Good morning 👋
            </p>

            <h1>
              Welcome back, Anish!
            </h1>

            <p className="dashboard-subtitle">
              Here's your financial overview for this month.
            </p>

          </div>


          <div className="header-actions">

            <button className="notification-button">
              <Bell size={20} />

              <span className="notification-dot"></span>
            </button>


            <button className="add-expense-button">

              <Plus size={18} />

              Add Expense

            </button>

          </div>

        </header>


        {/* =====================================
            STATS
        ====================================== */}

        <section className="stats-grid">

          <StatCard
            title="Total Balance"
            value="₹48,250"
            change="+12.5% this month"
            icon={Wallet}
            type="balance"
          />

          <StatCard
            title="Monthly Income"
            value="₹35,000"
            change="+8.2% this month"
            icon={TrendingUp}
            type="income"
          />

          <StatCard
            title="Monthly Expenses"
            value="₹18,750"
            change="-5.4% this month"
            icon={TrendingDown}
            type="expense"
          />

          <StatCard
            title="Total Savings"
            value="₹16,250"
            change="+15.7% this month"
            icon={PiggyBank}
            type="savings"
          />

        </section>


        {/* =====================================
            MAIN GRID
        ====================================== */}

        <section className="dashboard-grid">


          {/* =================================
              SPENDING OVERVIEW
          ================================= */}

          <div className="dashboard-card spending-overview">

            <div className="card-header">

              <div>

                <h3>
                  Spending Overview
                </h3>

                <p>
                  Your expenses this month
                </p>

              </div>

              <select>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>

            </div>


            {/* Chart */}

            <div className="chart-container">

              <div className="chart-y-axis">

                <span>₹20k</span>
                <span>₹15k</span>
                <span>₹10k</span>
                <span>₹5k</span>
                <span>₹0</span>

              </div>


              <div className="chart">

                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>

                <div className="chart-bars">

                  <div
                    className="chart-bar"
                    style={{ height: "35%" }}
                  ></div>

                  <div
                    className="chart-bar"
                    style={{ height: "52%" }}
                  ></div>

                  <div
                    className="chart-bar"
                    style={{ height: "42%" }}
                  ></div>

                  <div
                    className="chart-bar"
                    style={{ height: "68%" }}
                  ></div>

                  <div
                    className="chart-bar"
                    style={{ height: "55%" }}
                  ></div>

                  <div
                    className="chart-bar"
                    style={{ height: "78%" }}
                  ></div>

                  <div
                    className="chart-bar active"
                    style={{ height: "62%" }}
                  ></div>

                </div>


                <div className="chart-labels">

                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>

                </div>

              </div>

            </div>

          </div>


          {/* =================================
              BUDGET
          ================================= */}

          <div className="dashboard-card budget-card">

            <div className="card-header">

              <div>

                <h3>
                  Monthly Budget
                </h3>

                <p>
                  February 2026
                </p>

              </div>

              <button className="view-button">
                View
                <ChevronRight size={16} />
              </button>

            </div>


            <div className="budget-amount">

              <strong>
                ₹18,750
              </strong>

              <span>
                of ₹30,000 spent
              </span>

            </div>


            <div className="budget-progress">

              <div
                className="budget-progress-fill"
                style={{ width: "62.5%" }}
              ></div>

            </div>


            <div className="budget-footer">

              <span>
                62.5% used
              </span>

              <strong>
                ₹11,250 left
              </strong>

            </div>


            {/* Budget categories */}

            <div className="budget-categories">

              <div className="budget-category">

                <div className="category-info">

                  <span className="category-dot food"></span>

                  <span>
                    Food
                  </span>

                </div>

                <strong>
                  ₹4,500
                </strong>

              </div>


              <div className="budget-category">

                <div className="category-info">

                  <span className="category-dot transport"></span>

                  <span>
                    Transport
                  </span>

                </div>

                <strong>
                  ₹2,800
                </strong>

              </div>


              <div className="budget-category">

                <div className="category-info">

                  <span className="category-dot shopping"></span>

                  <span>
                    Shopping
                  </span>

                </div>

                <strong>
                  ₹3,250
                </strong>

              </div>

            </div>

          </div>


        </section>


        {/* =====================================
            BOTTOM GRID
        ====================================== */}

        <section className="bottom-grid">


          {/* =================================
              RECENT TRANSACTIONS
          ================================= */}

          <div className="dashboard-card transactions-card">

            <div className="card-header">

              <div>

                <h3>
                  Recent Transactions
                </h3>

                <p>
                  Your latest financial activities
                </p>

              </div>

              <button className="view-button">
                View All
                <ChevronRight size={16} />
              </button>

            </div>


            <div className="transactions-list">

              <Transaction
                icon={ShoppingBag}
                title="Amazon Shopping"
                category="Shopping"
                date="Today"
                amount="2,499"
                type="expense"
              />

              <Transaction
                icon={Coffee}
                title="Cafe Coffee Day"
                category="Food"
                date="Today"
                amount="350"
                type="expense"
              />

              <Transaction
                icon={Home}
                title="Monthly Rent"
                category="Housing"
                date="Yesterday"
                amount="8,000"
                type="expense"
              />

              <Transaction
                icon={CreditCard}
                title="Salary"
                category="Income"
                date="Sep 28"
                amount="35,000"
                type="income"
              />

            </div>

          </div>


          {/* =================================
              AI COACH
          ================================= */}

          <div className="ai-coach-card">

            <div className="ai-coach-icon">
              <Bot size={26} />
            </div>

            <span className="ai-label">
              AI FINANCE COACH
            </span>

            <h2>
              Your spending looks healthy!
            </h2>

            <p>
              You've reduced your discretionary spending
              by 12% compared to last month. Keep going!
            </p>


            <div className="ai-tip">

              <span>
                💡
              </span>

              <p>
                You could save another ₹2,000 this month
                by reducing shopping expenses.
              </p>

            </div>


            <button className="coach-button">

              Talk to AI Coach

              <ArrowUpRight size={17} />

            </button>

          </div>


        </section>


        {/* =====================================
            FINANCIAL GOALS
        ====================================== */}

        <section className="dashboard-card goals-card">

          <div className="card-header">

            <div>

              <h3>
                Financial Goals
              </h3>

              <p>
                Keep working toward your goals
              </p>

            </div>

            <button className="view-button">
              View Goals
              <ChevronRight size={16} />
            </button>

          </div>


          <div className="goals-grid">


            <div className="goal-item">

              <div className="goal-icon">
                🏠
              </div>

              <div className="goal-info">

                <div className="goal-title">

                  <strong>
                    New Laptop
                  </strong>

                  <span>
                    72%
                  </span>

                </div>

                <div className="goal-progress">

                  <div
                    style={{ width: "72%" }}
                  ></div>

                </div>

                <p>
                  ₹72,000 / ₹1,00,000
                </p>

              </div>

            </div>


            <div className="goal-item">

              <div className="goal-icon">
                ✈️
              </div>

              <div className="goal-info">

                <div className="goal-title">

                  <strong>
                    Travel Fund
                  </strong>

                  <span>
                    45%
                  </span>

                </div>

                <div className="goal-progress">

                  <div
                    style={{ width: "45%" }}
                  ></div>

                </div>

                <p>
                  ₹22,500 / ₹50,000
                </p>

              </div>

            </div>


            <div className="goal-item">

              <div className="goal-icon">
                🛡️
              </div>

              <div className="goal-info">

                <div className="goal-title">

                  <strong>
                    Emergency Fund
                  </strong>

                  <span>
                    35%
                  </span>

                </div>

                <div className="goal-progress">

                  <div
                    style={{ width: "35%" }}
                  ></div>

                </div>

                <p>
                  ₹17,500 / ₹50,000
                </p>

              </div>

            </div>


          </div>

        </section>


      </main>

    </div>
  );
};


export default Dashboard;