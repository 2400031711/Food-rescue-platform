import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDonation.css";

function AddDonation() {

  const navigate = useNavigate();

  const [donation, setDonation] = useState({
    foodName: "",
    quantity: "",
    location: "",
    pickupDate: "",
    pickupTime: "",
  });

  /* HANDLE INPUT CHANGE */

  const handleChange = (e) => {
    setDonation({
      ...donation,
      [e.target.name]: e.target.value,
    });
  };

  /* SUBMIT DONATION */

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      foodName,
      quantity,
      location,
      pickupDate,
      pickupTime,
    } = donation;

    if (
      !foodName ||
      !quantity ||
      !location ||
      !pickupDate ||
      !pickupTime
    ) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Get existing donations
    const existingDonations =
      JSON.parse(localStorage.getItem("donations")) || [];

    // ✅ Get donor profile
    const profile =
      JSON.parse(localStorage.getItem("profile")) || {};

    // ✅ Create donation object
    const newDonation = {
      id: Date.now(), // unique id
      foodName,
      quantity,
      location,
      pickupDate,
      pickupTime,
      donorName: profile.name || "Food Donor",
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    // ✅ Save donation
    localStorage.setItem(
      "donations",
      JSON.stringify([...existingDonations, newDonation])
    );

    alert("Donation Added Successfully ✅");

    navigate("/my-donations");
  };

  return (
    <div className="donation-page">

      <h2 className="donation-title">
        Add Food Donation
      </h2>

      <form
        className="donation-form"
        onSubmit={handleSubmit}
      >

        {/* FOOD NAME */}
        <div className="form-group">
          <label>Food Name</label>
          <input
            type="text"
            name="foodName"
            placeholder="Rice, Bread, Fruits"
            value={donation.foodName}
            onChange={handleChange}
          />
        </div>

        {/* QUANTITY */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            placeholder="5kg / 10 boxes"
            value={donation.quantity}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Pickup Address"
            value={donation.location}
            onChange={handleChange}
          />
        </div>

        {/* DATE + TIME */}
        <div className="form-row">

          <div className="form-group-half">
            <label>Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              value={donation.pickupDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-half">
            <label>Pickup Time</label>
            <input
              type="time"
              name="pickupTime"
              value={donation.pickupTime}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="donation-btn"
        >
          Add Donation
        </button>

      </form>

    </div>
  );
}

export default AddDonation;