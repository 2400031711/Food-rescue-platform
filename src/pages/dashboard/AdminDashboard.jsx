// src/pages/dashboard/AdminDashboard.jsx (or AnalystDashboard.jsx)
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./Admin.css";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);

  // =============================
  // LOAD DONATIONS
  // =============================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  // =============================
  // SUMMARY COUNTS
  // =============================
  const total = donations.length;
  const pending = donations.filter(d => d.status === "Pending").length;
  const delivered = donations.filter(d => d.status === "Delivered").length; // ✅ fixed

  // =============================
  // PIE DATA
  // =============================
  const pieData = [
    { name: "Pending", value: pending },
    { name: "Delivered", value: delivered }, // updated name
  ];
  const COLORS = ["#FFBB28", "#00C49F"];

  // =============================
  // LOCATION BAR DATA
  // =============================
  const locationCounts = donations.reduce((acc, d) => {
    acc[d.location] = (acc[d.location] || 0) + 1;
    return acc;
  }, {});

  const locationData = Object.keys(locationCounts).map(loc => ({
    location: loc,
    count: locationCounts[loc],
  }));

  // =============================
  // LIVE TREND DATA
  // =============================
  const trend = donations.reduce((acc, d) => {
    const date = d.pickupDate || "Unknown";
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trendData = Object.keys(trend).map(date => ({
    date,
    donations: trend[date],
  }));

  // =============================
  // MONTHLY DATA
  // =============================
  const monthly = donations.reduce((acc, d) => {
    if (!d.pickupDate) return acc;
    const month = new Date(d.pickupDate).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.keys(monthly).map(m => ({
    month: m,
    count: monthly[m],
  }));

  // =============================
  // FOOD ANALYTICS
  // =============================
  const foodStats = donations.reduce((acc, d) => {
    const food = d.foodName || "Other";
    acc[food] = (acc[food] || 0) + 1;
    return acc;
  }, {});

  const foodData = Object.keys(foodStats).map(f => ({
    food: f,
    count: foodStats[f],
  }));

  // =============================
  // WASTE REDUCTION
  // =============================
  const totalQty = donations.reduce((sum, d) => sum + Number(d.quantity || 0), 0);
  const mealsSaved = totalQty * 2;
  const wasteReduction = (mealsSaved * 0.5).toFixed(1);

  // =============================
  // EXPORT PDF
  // =============================
  const exportPDF = async () => {
    const input = document.querySelector(".admin-container");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0, 210, 295);
    pdf.save("Food_Analytics_Report.pdf");
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="admin-container">
      <h2>📊 Admin / Analyst Dashboard</h2>

      <button className="export-btn" onClick={exportPDF}>
        Export Report PDF
      </button>

      {/* SUMMARY */}
      <div className="summary-panel">
        <div className="summary-card">
          <h3>Total Donations</h3>
          <p>{total}</p>
        </div>

        <div className="summary-card pending">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="summary-card delivered">
          <h3>Delivered</h3>
          <p>{delivered}</p>
        </div>

        <div className="summary-card waste">
          <h3>Waste Reduced</h3>
          <p>{wasteReduction}%</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        {/* PIE */}
        <div className="chart-card">
          <h3>Donation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" label>
                {pieData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LOCATION */}
        <div className="chart-card">
          <h3>Donations by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TREND */}
        <div className="chart-card">
          <h3>Live Donation Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="donations" stroke="#FFBB28" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY */}
        <div className="chart-card">
          <h3>Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FOOD */}
        <div className="chart-card">
          <h3>Food Category Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={foodData}>
              <XAxis dataKey="food" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;