// src/pages/dashboard/RecipientDashboard.jsx
import { useEffect, useState } from "react";
import "./RecipientDashboard.css";

// Mock data for front-end only
const mockDonations = [
  { _id: "1", foodName: "Vegetable Pack", quantity: 10, location: "Center A", pickupDate: "2026-03-01", status: "Pending" },
  { _id: "2", foodName: "Bread & Snacks", quantity: 25, location: "Center B", pickupDate: "2026-02-28", status: "Pending" },
  { _id: "3", foodName: "Fruit Basket", quantity: 15, location: "Center C", pickupDate: "2026-03-05", status: "Pending" },
];

function RecipientDashboard() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || mockDonations;
    setDonations(stored);
  }, []);

  // Claim a donation (Pending -> Claimed)
  const handleClaim = (id) => {
    const updated = donations.map(d =>
      d._id === id ? { ...d, status: "Claimed" } : d
    );
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
    alert("Donation claimed successfully!");
  };

  // Deliver a donation (Claimed -> Delivered)
  const handleDeliver = (id) => {
    const updated = donations.map(d =>
      d._id === id ? { ...d, status: "Delivered" } : d
    );
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
    alert("Donation marked as Delivered!");
  };

  // Filter donations for display
  const availableDonations = donations
    .filter(d => d.status === "Pending")
    .filter(d => d.foodName.toLowerCase().includes(search.toLowerCase()));

  const claimedDonations = donations.filter(d => d.status !== "Pending");

  return (
    <div className="dashboard">
      <h2>Available Donations</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search donations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {availableDonations.length === 0 ? (
        <p>No available donations.</p>
      ) : (
        <div className="donation-grid">
          {availableDonations.map((d) => (
            <div key={d._id} className="donation-card">
              <h3>{d.foodName}</h3>
              <p><strong>Quantity:</strong> {d.quantity}</p>
              <p><strong>Location:</strong> {d.location}</p>
              <p><strong>Pickup Date:</strong> {d.pickupDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="status pending">{d.status}</span>
              </p>
              <button className="claim-btn" onClick={() => handleClaim(d._id)}>Claim</button>
            </div>
          ))}
        </div>
      )}

      {/* Claimed Donations */}
      <h2 className="mt-8">My Claimed Donations</h2>
      {claimedDonations.length === 0 ? (
        <p>You haven't claimed any donations yet.</p>
      ) : (
        <div className="donation-grid">
          {claimedDonations.map((d) => (
            <div key={d._id} className="donation-card">
              <h3>{d.foodName}</h3>
              <p><strong>Quantity:</strong> {d.quantity}</p>
              <p><strong>Location:</strong> {d.location}</p>
              <p><strong>Pickup Date:</strong> {d.pickupDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${d.status.toLowerCase()}`}>{d.status}</span>
              </p>
              {d.status === "Claimed" && (
                <button className="claim-btn" onClick={() => handleDeliver(d._id)}>
                  Mark Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipientDashboard;