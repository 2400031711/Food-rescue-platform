import { useNavigate } from "react-router-dom";
import "./Auth.css";

function RoleSelection() {

  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Select Your Role</h2>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Choose how you want to contribute to Food Rescue
        </p>

        <button
          className="auth-btn"
          onClick={() => navigate("/donor")}
        >
          🍱 Donor
        </button>

        <button
          className="auth-btn"
          onClick={() => navigate("/recipient")}
          style={{ marginTop: "10px" }}
        >
          🤝 Recipient
        </button>

        <button
          className="auth-btn"
          onClick={() => navigate("/analyst")}
          style={{ marginTop: "10px" }}
        >
          📊 Analyst / Admin
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;