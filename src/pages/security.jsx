import React, { useState } from "react";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = () => {

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    // Save password (temporary local storage)
    localStorage.setItem("userPassword", newPassword);

    setMessage("Password Updated Successfully ✅");

    // Clear fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Security</h2>

      <div style={styles.card}>

        <h3 style={styles.subtitle}>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleUpdatePassword}
          style={styles.button}
        >
          Update Password
        </button>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

      </div>

    </div>
  );
};

const styles = {

container: {
  padding: "40px",
  backgroundColor: "#f7f8fc",
  minHeight: "100vh",
  fontFamily: "Arial"
},

title: {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px"
},

card: {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
},

subtitle: {
  marginBottom: "20px"
},

input: {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
},

button: {
  width: "100%",
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
},

message: {
  marginTop: "15px",
  color: "green",
  fontWeight: "bold"
}

};

export default Security;