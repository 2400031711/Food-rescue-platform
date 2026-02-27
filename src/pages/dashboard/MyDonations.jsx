import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyDonations.css";

function MyDonations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = [...donations];
    updated.splice(index, 1);
    setDonations(updated);
    localStorage.setItem("donations", JSON.stringify(updated));
  };

  return (
    <div className="my-donations-page">
      <h2 className="donations-title">My Donations</h2>

      {donations.length === 0 ? (
        <p className="no-donations">You have not added any donations yet.</p>
      ) : (
        <div className="donations-grid">
          {donations.map((d, i) => (
            <div key={i} className="donation-card">
              <h3>{d.foodName}</h3>
              <p><strong>Quantity:</strong> {d.quantity}</p>
              <p><strong>Location:</strong> {d.location}</p>
              <p><strong>Pickup Date:</strong> {d.pickupDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${d.status.toLowerCase()}`}>
                  {d.status}
                </span>
              </p>

              <div className="donation-actions">
                {d.status === "Pending" && (
                  <button onClick={() => handleDelete(i)} className="delete-btn">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;