// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;