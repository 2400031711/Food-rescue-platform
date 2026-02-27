import { Link } from "react-router-dom";
import "./Admin.css";

function AdminDashboard() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const donors = users.filter((u) => u.role === "donor").length;
  const recipients = users.filter((u) => u.role === "recipient").length;

  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  const completed = donations.filter((d) => d.status === "Completed").length;

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        {loggedUser.photo ? (
          <img
            src={loggedUser.photo}
            alt="Admin"
            className="admin-avatar"
          />
        ) : (
          <div className="admin-avatar">{loggedUser.name?.charAt(0)}</div>
        )}
        <p style={{ marginBottom: "20px" }}>{loggedUser.name || "Admin"}</p>

        <Link to="/admin-dashboard">🏠 Dashboard</Link>
        <Link to="/manage-users">👥 Manage Users</Link>
        <Link to="/manage-food">🍱 Manage Food</Link>
        <Link to="/admin-profile">👤 Profile</Link>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Main */}
      <div className="admin-main">
        <h1>Welcome {loggedUser.name || "Admin"} 👨‍💼</h1>
        <p className="admin-subtitle">
          Food Waste Management System Overview
        </p>

        <div className="admin-cards">
          <div className="admin-card">
            <h3>Total Users</h3>
            <h2>{users.length}</h2>
          </div>

          <div className="admin-card">
            <h3>Total Donors</h3>
            <h2>{donors}</h2>
          </div>

          <div className="admin-card">
            <h3>Total Recipients</h3>
            <h2>{recipients}</h2>
          </div>

          <div className="admin-card">
            <h3>Total Donations</h3>
            <h2>{donations.length}</h2>
          </div>

          <div className="admin-card">
            <h3>Completed Donations</h3>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="admin-info">
          <h3>Admin Control Panel</h3>
          <p>
            ✔ Manage Donors and Recipients <br />
            ✔ Monitor Food Donations <br />
            ✔ Track Completed Deliveries
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;