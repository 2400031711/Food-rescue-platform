import { Link, useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>

      {/* Logo */}
      <div style={styles.logo}>
        <FaLeaf /> Food Rescue Platform
      </div>

      <div>

        <Link to="/" style={styles.link}>Home</Link>

        {/* ADMIN */}
        {role === "admin" && (
          <Link to="/admin-dashboard" style={styles.link}>
            Admin Dashboard
          </Link>
        )}

        {/* FOOD DONOR */}
        {role === "donor" && (
          <>
            <Link to="/add-donation" style={styles.link}>
              Donate Food
            </Link>

            <Link to="/my-donations" style={styles.link}>
              My Donations
            </Link>
          </>
        )}

        {/* RECIPIENT */}
        {role === "recipient" && (
          <Link to="/recipient-dashboard" style={styles.link}>
            Available Food
          </Link>
        )}

        {/* DATA ANALYST */}
        {role === "analyst" && (
          <Link to="/analyst-dashboard" style={styles.link}>
            Analytics
          </Link>
        )}

        {!role ? (
          <Link to="/login" style={styles.link}>Login</Link>
        ) : (
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#16a34a",
    color: "white"
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: "bold"
  },

  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },

  logout: {
    marginLeft: "20px",
    padding: "6px 14px",
    background: "white",
    color: "#16a34a",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};