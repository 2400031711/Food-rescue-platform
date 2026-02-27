import { Link } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {

  const handleReset = () => {
    alert("Password reset link sent to your email ✅");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter registered email"
          className="auth-input"
        />

        <button className="auth-btn" onClick={handleReset}>
          Send Reset Link
        </button>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;