import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AnalystProfile.css";

function AnalystProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(() => {
    return JSON.parse(localStorage.getItem("analystProfile")) || {
      name: "",
      email: "",
      phone: "",
      department: "",
      joinedDate: "",
    };
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("analystProfile", JSON.stringify(profile));
    alert("Profile Saved ✅");
  };

  const changePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPhoto(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  return (
    <div className="analyst-profile-container">
      <div className="dashboard-header">
        <h2>FoodLink - Analyst</h2>
        <button className="dashboard-btn" onClick={() => navigate("/analyst-dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="profile-main-card">
        <div className="profile-tabs">
          <span className="active-tab" onClick={() => navigate("/analyst-profile")}>Profile</span>
          <span onClick={() => navigate("/analyst-notifications")}>Notifications</span>
          <span onClick={() => navigate("/analyst-security")}>Security</span>
        </div>

        <div className="profile-header">
          <div className="profile-avatar">
            {photo ? <img src={photo} className="avatar-img" alt="Analyst Avatar" /> : "👤"}
          </div>
          <div className="profile-info">
            <h3>{profile.name || "Data Analyst"}</h3>
            <p>{profile.email || "analyst@email.com"}</p>
            <label className="change-photo">
              Change Photo
              <input type="file" onChange={changePhoto} hidden />
            </label>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div>
              <label>Full Name</label>
              <input name="name" value={profile.name} onChange={handleChange} />
            </div>
            <div>
              <label>Email Address</label>
              <input name="email" value={profile.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Phone Number</label>
              <input name="phone" value={profile.phone} onChange={handleChange} />
            </div>
            <div>
              <label>Department</label>
              <input name="department" value={profile.department} onChange={handleChange} />
            </div>
          </div>

          <label>Joined Date</label>
          <input type="date" name="joinedDate" value={profile.joinedDate} onChange={handleChange} />

          <button className="save-btn" onClick={saveProfile}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default AnalystProfile;