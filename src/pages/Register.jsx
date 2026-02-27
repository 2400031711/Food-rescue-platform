import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.email || !user.role || !user.password || !user.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.some(u => u.email === user.email);
    if (exists) {
      alert("User with this email already exists!");
      return;
    }

    // Save new user
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully ✅");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input type="text" name="firstName" placeholder="First Name" className="auth-input" value={user.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="auth-input" value={user.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" className="auth-input" value={user.email} onChange={handleChange} required />

          <select name="role" className="auth-input" value={user.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
            <option value="admin">Admin</option>
            <option value="analyst">Data Analyst</option>
          </select>

          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="auth-input" value={user.password} onChange={handleChange} required />
          <div className="show-pass">
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> <span>Show Password</span>
          </div>

          <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="auth-input" value={user.confirmPassword} onChange={handleChange} required />
          <div className="show-pass">
            <input type="checkbox" onChange={() => setShowConfirm(!showConfirm)} /> <span>Show Confirm Password</span>
          </div>

          <button type="submit" className="auth-btn">Register</button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <span onClick={() => navigate("/login")} className="create-link">Login Here</span></p>
        </div>
      </div>
    </div>
  );
}

export default Register;