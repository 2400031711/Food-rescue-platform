import { useEffect, useState } from "react";

function ViewDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(data);
  }, []);

  return (
    <div>
      <h2>Available Donations</h2>

      {donations.map((item) => (
        <div key={item.id}>
          <h3>{item.foodName}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Location: {item.location}</p>
          <p>Date: {item.pickupDate}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ViewDonations;