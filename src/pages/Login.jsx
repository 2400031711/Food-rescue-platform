import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const savedUser = users.find(
      (user) => user.email === loginData.email
    );

    if (!savedUser) {
      alert("No account found. Please Register.");
      navigate("/register");
      return;
    }

    if (loginData.password === savedUser.password) {
      alert("Login Successful ✅");

      // Role-based dashboard redirect
      switch (savedUser.role) {
        case "donor":
          navigate("/donor-dashboard");
          break;
        case "recipient":
          navigate("/recipient-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "analyst":
          navigate("/analyst-dashboard");
          break;
        default:
          navigate("/");
      }
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="auth-input"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            className="auth-input"
            onChange={handleChange}
            required
          />

          {/* Show Password */}
          <div className="show-pass">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </div>

          {/* Login Button */}
          <button type="submit" className="auth-btn">
            SIGN IN
          </button>
        </form>

        {/* Links */}
        <div className="auth-links">
          <p>
            Forgot Password?{" "}
            <Link to="/forgot-password" className="create-link">
              Reset
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="create-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;