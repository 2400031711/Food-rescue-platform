import React from "react";
import { Link } from "react-router-dom";


const DonorNavbar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#eee" }}>
      <div>
        <Link to="/donor-dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
        <Link to="/add-donation" style={{ marginRight: "15px" }}>Add Donation</Link>
        <Link to="/my-donations">My Donations</Link>
      </div>
      <LogoutButton />
    </div>
  );
};

export default DonorNavbar;