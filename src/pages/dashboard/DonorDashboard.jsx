// src/pages/dashboard/DonorDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function DonorDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [donorName, setDonorName] = useState("Donor");
  const [showNotifications, setShowNotifications] = useState(false);

  /* LOAD DATA */
  useEffect(() => {
    const savedDonations = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(savedDonations);

    const pending = savedDonations.filter((d) => d.status === "Pending");
    setNotifications([
      `You have ${pending.length} pending donations`,
      "Thank you for helping reduce food waste!",
    ]);

    /* LOAD DONOR NAME */
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile && savedProfile.name) {
      setDonorName(savedProfile.name);
    }
  }, []);

  /* METRICS */
  const totalDonations = donations.length;
  const completed = donations.filter((d) => d.status === "Delivered").length; // ✅ fixed
  const claimed = donations.filter((d) => d.status === "Claimed").length; // optional

  const totalQuantity = donations.reduce((sum, d) => sum + Number(d.quantity || 0), 0);
  const mealsServed = totalQuantity * 2;

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("currentUserEmail");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {donorName} 👋</h1>
          <p className="dashboard-subtitle">Manage your food donations efficiently</p>
        </div>

        <div className="header-icons">
          {/* Notifications */}
          <div className="icon-box" onClick={() => navigate("/notifications")}>
            🔔
            <span className="badge">{notifications.length}</span>
          </div>

          {/* Profile */}
          <div className="icon-box" onClick={() => navigate("/profile")}>
            👤
          </div>

          {/* Logout */}
          <div className="icon-box" onClick={logout}>
            🚪
          </div>

          {/* Notification Popup */}
          {showNotifications && (
            <div className="notification-box">
              {notifications.map((n, i) => (
                <p key={i}>{n}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* METRICS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Total Donations</h4>
          <p>{totalDonations}</p>
        </div>

        <div className="metric-card">
          <h4>Delivered</h4>
          <p>{completed}</p>
        </div>

        <div className="metric-card">
          <h4>Claimed</h4>
          <p>{claimed}</p>
        </div>

        <div className="metric-card">
          <h4>Total Quantity</h4>
          <p>{totalQuantity}</p>
        </div>

        <div className="metric-card">
          <h4>Meals Served 🍽</h4>
          <p>{mealsServed}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="action-grid">
        <div className="dashboard-card">
          <h3>Add Food Donation</h3>
          <Link to="/add-donation">
            <button className="dashboard-btn">Add Donation</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>My Donations</h3>
          <Link to="/my-donations">
            <button className="dashboard-btn">View Donations</button>
          </Link>
        </div>
      </div>

      {/* IMPACT */}
      <div className="impact-card">
        <h3>Your Impact</h3>
        <p>
          You helped serve <b>{mealsServed}</b> meals through food donations.
        </p>
      </div>
    </div>
  );
}

export default DonorDashboard;