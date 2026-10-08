import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup Data:", formData);
    alert("Account created successfully!");

    // Temporary signup navigation
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">

      {/* =========================
          LEFT SIDE
      ========================== */}
      <div className="signup-left">

        <div className="signup-brand">
          <span className="signup-logo">₹</span>
          <span>FinCoach AI</span>
        </div>

        <div className="signup-content">

          <span className="signup-badge">
            AI-Powered Personal Finance
          </span>

          <h1>
            Start Your
            <span> Financial Journey</span>
          </h1>

          <p>
            Create your FinCoach AI account and take control
            of your money with smart budgeting, expense tracking,
            and personalized financial insights.
          </p>

          <div className="signup-features">

            <div className="signup-feature">
              <span>✓</span>
              <p>Track your income and expenses</p>
            </div>

            <div className="signup-feature">
              <span>✓</span>
              <p>Create smart financial budgets</p>
            </div>

            <div className="signup-feature">
              <span>✓</span>
              <p>Set and track your financial goals</p>
            </div>

            <div className="signup-feature">
              <span>✓</span>
              <p>Get AI-powered financial insights</p>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="signup-right">

        <div className="signup-card">

          {/* Header */}
          <div className="signup-header">

            <h2>
              Create Account
            </h2>

            <p>
              Join FinCoach AI and start managing your finances smarter.
            </p>

          </div>


          {/* Signup Form */}
          <form onSubmit={handleSignup}>

            {/* Full Name */}
            <div className="signup-form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}
            <div className="signup-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* Password */}
            <div className="signup-form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />

            </div>


            {/* Confirm Password */}
            <div className="signup-form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
              />

            </div>


            {/* Terms */}
            <div className="signup-terms">

              <input
                type="checkbox"
                id="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the Terms & Conditions and Privacy Policy.
              </label>

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="signup-submit"
            >
              Create Account →
            </button>

          </form>


          {/* Divider */}
          <div className="signup-divider">
            <span>or</span>
          </div>


          {/* Google Signup */}
          <button className="google-signup">
            <span>G</span>
            Continue with Google
          </button>


          {/* Login */}
          <p className="login-text">

            Already have an account?

            <a href="/login">
              Login
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;