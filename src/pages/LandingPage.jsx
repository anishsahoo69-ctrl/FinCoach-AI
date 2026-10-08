import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">

      {/* =========================
          NAVBAR
      ========================== */}
      <nav className="navbar">

        <div className="logo">
          <span className="logo-icon">₹</span>
          <span>FinCoach AI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/signup" className="signup-btn">
            Get Started
          </Link>
        </div>

      </nav>


      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            AI-Powered Personal Finance
          </span>

          <h1>
            Manage Your
            <span> Finances Smarter</span>
          </h1>

          <p>
            Track expenses, manage your budget, build better
            financial habits, and get personalized AI-powered
            financial insights — all in one place.
          </p>

          <div className="hero-buttons">

            <button className="cta-btn">
              Get Started →
            </button>

            <button className="secondary-btn">
              Explore Features
            </button>

          </div>

          <p className="hero-subtext">
            Smart • Simple • Secure
          </p>

        </div>


        {/* =========================
            HERO DASHBOARD
        ========================== */}
        <div className="hero-image">

          <div className="dashboard-card">

            <div className="dashboard-top">

              <div>
                <span>Welcome back 👋</span>
                <h3>Financial Overview</h3>
              </div>

              <div className="profile-circle">
                A
              </div>

            </div>


            {/* Balance */}
            <div className="balance-card">

              <p>Total Balance</p>

              <h2>₹48,250</h2>

              <span className="balance-growth">
                +12.5% this month
              </span>

            </div>


            {/* Income / Expense */}
            <div className="finance-summary">

              <div className="summary-card">
                <span>Income</span>
                <strong>₹35,000</strong>
              </div>

              <div className="summary-card">
                <span>Expenses</span>
                <strong>₹18,750</strong>
              </div>

            </div>


            {/* Spending */}
            <div className="spending-card">

              <div className="spending-header">
                <span>Monthly Spending</span>
                <span>₹18,750</span>
              </div>

              <div className="spending-bars">

                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
                <div className="bar bar-6"></div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES SECTION
      ========================== */}
      <section className="features" id="features">

        <div className="section-heading">

          <span>POWERFUL FEATURES</span>

          <h2>
            Everything you need to manage your money
          </h2>

          <p>
            FinCoach AI gives you simple tools and intelligent
            insights to help you make better financial decisions.
          </p>

        </div>


        <div className="feature-grid">

          {/* Expense Tracking */}
          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Expense Tracking
            </h3>

            <p>
              Monitor your daily spending, categorize expenses,
              and understand where your money goes.
            </p>

          </div>


          {/* Budget Planner */}
          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Smart Budget Planner
            </h3>

            <p>
              Create personalized budgets and allocate your
              income across needs, savings, investments, and goals.
            </p>

          </div>


          {/* AI Finance Coach */}
          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI Finance Coach
            </h3>

            <p>
              Get personalized financial insights and suggestions
              based on your spending and financial goals.
            </p>

          </div>


          {/* Investments */}
          <div className="feature-card">

            <div className="feature-icon">
              📈
            </div>

            <h3>
              Investment Insights
            </h3>

            <p>
              Understand your investment options and track your
              financial growth from one place.
            </p>

          </div>


          {/* Financial Goals */}
          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Financial Goals
            </h3>

            <p>
              Set savings and financial goals and track your
              progress over time.
            </p>

          </div>


          {/* Security */}
          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <h3>
              Secure & Private
            </h3>

            <p>
              Keep your financial information protected with
              privacy-focused account management.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section className="how-it-works" id="how-it-works">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Take control in three simple steps
          </h2>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Create Your Account
            </h3>

            <p>
              Sign up and provide basic information about
              your financial goals.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Track Your Finances
            </h3>

            <p>
              Add your income, expenses, budgets, and
              financial activities.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Get AI Insights
            </h3>

            <p>
              FinCoach AI analyzes your financial information
              and provides useful insights.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CTA SECTION
      ========================== */}
      <section className="cta-section" id="about">

        <h2>
          Ready to take control of your finances?
        </h2>

        <p>
          Start your journey toward smarter financial management
          with FinCoach AI.
        </p>

        <button className="cta-btn">
          Start Your Financial Journey →
        </button>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="footer">

        <div className="footer-content">

          <div>

            <div className="footer-logo">
              <span>₹</span>
              FinCoach AI
            </div>

            <p>
              Your AI-powered personal finance companion.
            </p>

          </div>


          <div className="footer-links">

            <a href="#features">
              Features
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

            <a href="#about">
              About
            </a>
            <Link to="/">Home</Link>

<a href="#features">Features</a>

<a href="#about">About</a>

<a href="#how-it-works">How It Works</a>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} FinCoach AI.
            All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;