import { useEffect, useState } from "react";
import "./Dashboard.css";

function ManageDonations() {

  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");

  // Load Donations
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  // Update LocalStorage
  const updateDonations = (updated) => {
    localStorage.setItem(
      "donations",
      JSON.stringify(updated)
    );
    setDonations(updated);
  };

  // Delete Donation
  const handleDelete = (id) => {
    const updated = donations.filter(
      (d) => d.id !== id
    );
    updateDonations(updated);
  };

  // Change Status
  const changeStatus = (id, status) => {
    const updated = donations.map((d) =>
      d.id === id ? { ...d, status } : d
    );

    updateDonations(updated);
  };

  // Search Filter
  const filtered = donations.filter((d) =>
    d.foodName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">
        🍱 Manage Food Donations
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Food..."
        className="dashboard-search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="table-wrapper">
        <table className="dashboard-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Food</th>
              <th>Quantity</th>
              <th>Donor</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7">
                  No Donations Available
                </td>
              </tr>
            ) : (
              filtered.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.foodName}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.donorName}</td>
                  <td>{donation.location}</td>

                  {/* Status */}
                  <td>
                    <select
                      value={donation.status}
                      onChange={(e) =>
                        changeStatus(
                          donation.id,
                          e.target.value
                        )
                      }
                    >
                      <option>Available</option>
                      <option>Requested</option>
                      <option>Completed</option>
                      <option>Expired</option>
                    </select>
                  </td>

                  {/* Delete */}
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(donation.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ManageDonations;