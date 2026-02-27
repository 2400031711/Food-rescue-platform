// src/pages/dashboard/AnalystDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "./AnalystDashboard.css";

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];

export default function AnalystDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotify, setShowNotify] = useState(false);

  // Profile photo state
  const [photo, setPhoto] = useState(localStorage.getItem("analystPhoto") || "");

  // Load donations, notifications, and photo
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("donations")) || [];
      setDonations(data);

      const pendingCount = data.filter((d) => d.status === "Pending").length;
      setNotifications([`${pendingCount} donations pending`, "Analytics Updated"]);

      const updatedPhoto = localStorage.getItem("analystPhoto") || "";
      setPhoto(updatedPhoto);
    };

    loadData();

    // Listen for localStorage updates
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener("storage", handleStorageChange);

    // Optional: interval for same-tab updates
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // KPIs
  const total = donations.length;
  const completed = donations.filter((d) => d.status === "Delivered").length; // ✅ Corrected
  const pending = donations.filter((d) => d.status === "Pending").length;
  const claimed = donations.filter((d) => d.status === "Claimed").length;
  const wasteReduction = total === 0 ? 0 : ((completed / total) * 100).toFixed(1);

  // Status Pie Data
  const statusData =
    total === 0
      ? [{ name: "No Donations", value: 1 }]
      : [
          { name: "Delivered", value: completed },
          { name: "Claimed", value: claimed },
          { name: "Pending", value: pending },
        ];

  // Location Bar Data
  const locationMap = {};
  donations.forEach((d) => {
    locationMap[d.location] = (locationMap[d.location] || 0) + 1;
  });
  const locationData = Object.keys(locationMap).map((loc) => ({
    name: loc,
    count: locationMap[loc],
  }));

  // Monthly Trend Line Data
  const monthlyMap = {};
  donations.forEach((d) => {
    const month = new Date(d.pickupDate || new Date()).toLocaleString("default", {
      month: "short",
    });
    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });
  const monthlyData = Object.keys(monthlyMap).map((m) => ({
    month: m,
    donations: monthlyMap[m],
  }));

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Food Donation Analytics", 20, 20);
    doc.text(`Total: ${total}`, 20, 40);
    doc.text(`Delivered: ${completed}`, 20, 50);
    doc.text(`Claimed: ${claimed}`, 20, 60);
    doc.text(`Pending: ${pending}`, 20, 70);
    doc.text(`Waste Reduction: ${wasteReduction}%`, 20, 80);
    doc.save("AnalyticsReport.pdf");
  };

  return (
    <div className="analyst-container">
      {/* NAVBAR */}
      <div className="analyst-navbar">
        <h2>📊 Analyst Dashboard</h2>
        <div className="nav-icons">
          <div className="icon-box" onClick={() => setShowNotify(!showNotify)}>
            🔔
            <span className="badge">{notifications.length}</span>
          </div>

          <div className="icon-box" onClick={() => navigate("/analyst-profile")}>
            {photo ? (
              <img src={photo} alt="Analyst Avatar" className="navbar-avatar" />
            ) : (
              "👤"
            )}
          </div>
        </div>
      </div>

      {showNotify && (
        <div className="notification-panel">
          {notifications.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid">
        <KPI title="Total Donations" value={total} />
        <KPI title="Delivered" value={completed} />
        <KPI title="Claimed" value={claimed} />
        <KPI title="Pending" value={pending} />
        <KPI title="Waste Reduction" value={wasteReduction + "%"} />
      </div>

      {/* CHARTS */}
      <div className="chart-grid">
        <ChartCard title="Donation Status">
          <PieChart width={320} height={250}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={false}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="Location Analytics">
          <BarChart width={400} height={250} data={locationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" />
          </BarChart>
        </ChartCard>
      </div>

      <div className="chart-grid">
        <ChartCard title="Monthly Trend">
          <LineChart width={400} height={250} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="donations" stroke="#3b82f6" />
          </LineChart>
        </ChartCard>
      </div>

      <div className="export-section">
        <button onClick={exportPDF}>Export Report PDF</button>
      </div>
    </div>
  );
}

// KPI Component
const KPI = ({ title, value }) => (
  <motion.div
    className="kpi-card"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h4>{title}</h4>
    <h2>{value}</h2>
  </motion.div>
);

// ChartCard Component
const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);