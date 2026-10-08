import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
 const handleLogin = (e) => {
  e.preventDefault();

  // Temporary login
  navigate("/dashboard");
};
  return (
    <div className="login-page">
      {/* Left Side */}
      <div className="login-left">

        <div className="login-brand">
          <span className="login-logo">₹</span>
          <span>FinCoach AI</span>
        </div>

        <div className="login-content">

          <span className="login-badge">
            AI-Powered Personal Finance
          </span>

          <h1>
            Welcome back to
            <span> FinCoach AI</span>
          </h1>

          <p>
            Manage your expenses, plan your budget, and make
            smarter financial decisions with your personal
            AI finance companion.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <span>✓</span>
              <p>Track your expenses easily</p>
            </div>

            <div className="login-feature">
              <span>✓</span>
              <p>Create smart financial budgets</p>
            </div>

            <div className="login-feature">
              <span>✓</span>
              <p>Get personalized AI insights</p>
            </div>

          </div>

        </div>

      </div>


      {/* Right Side */}
      <div className="login-right">

        <div className="login-card">

          <div className="login-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to continue to your FinCoach AI account.
            </p>

          </div>


          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />

            </div>

            <div className="remember-me">

              <input
                type="checkbox"
                id="remember"
              />

              <label htmlFor="remember">
                Remember me
              </label>

            </div>

            <button
              type="submit"
              className="login-submit"
            >
              Login
            </button>

          </form>


          {/* Divider */}
          <div className="login-divider">
            <span>or</span>
          </div>


          {/* Google Login */}
          <button className="google-login">
            <span>G</span>
            Continue with Google
          </button>


          {/* Signup */}
          <p className="signup-text">

            Don't have an account?

            <a href="#">
              Create Account
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;