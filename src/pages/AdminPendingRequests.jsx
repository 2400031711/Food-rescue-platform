import React, { useEffect, useState } from "react";

const AdminPendingRequests = () => {
  const initialData = [
    { id: 1, name: "Rice", quantity: 10, donorName: "Donor A", status: "pending" },
    { id: 2, name: "Bread", quantity: 5, donorName: "Donor B", status: "pending" },
    { id: 3, name: "Milk", quantity: 20, donorName: "Donor C", status: "pending" },
  ];

  const [pendingFoods, setPendingFoods] = useState([]);

  useEffect(() => {
    setPendingFoods(initialData);
  }, []);

  const acceptFood = (id) => {
    setPendingFoods(prev => prev.map(f => f.id === id ? {...f, status: "accepted"} : f));
  };

  const rejectFood = (id) => {
    setPendingFoods(prev => prev.map(f => f.id === id ? {...f, status: "rejected"} : f));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Pending Food Requests</h2>
      {pendingFoods.filter(f => f.status === "pending").length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Donor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingFoods.filter(f => f.status === "pending").map(food => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.donorName}</td>
                <td>{food.status}</td>
                <td>
                  <button onClick={() => acceptFood(food.id)} style={{ marginRight: "5px" }}>Accept</button>
                  <button onClick={() => rejectFood(food.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPendingRequests;