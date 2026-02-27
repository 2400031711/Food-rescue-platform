import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AnalystProfile.css";

function AnalystProfile() {
  const navigate = useNavigate();

  // PROFILE STATE
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    joinedDate: "",
  });

  // PHOTO STATE
  const [photo, setPhoto] = useState("");

  // LOAD PROFILE AND PHOTO
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("analystProfile")) || {};
    setProfile(savedProfile);

    const savedPhoto = localStorage.getItem("analystPhoto");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // SAVE PROFILE
  const saveProfile = () => {
    localStorage.setItem("analystProfile", JSON.stringify(profile));
    alert("Profile Saved Successfully ✅");
  };

  // CHANGE PHOTO (RESIZE & COMPRESS ANY IMAGE)
  const changePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 200; // max width or height
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setPhoto(compressedDataUrl);
        localStorage.setItem("analystPhoto", compressedDataUrl);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="analyst-profile-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>FoodLink - Analyst</h2>
        <button className="dashboard-btn" onClick={() => navigate("/analyst-dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="profile-main-card">
        {/* Tabs */}
        <div className="profile-tabs">
          <span className="active-tab" onClick={() => navigate("/analyst-profile")}>
            Profile
          </span>
          <span onClick={() => navigate("/analyst-notifications")}>Notifications</span>
          <span onClick={() => navigate("/analyst-security")}>Security</span>
        </div>

        {/* PROFILE HEADER */}
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

        {/* FORM */}
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
          <input
            type="date"
            name="joinedDate"
            value={profile.joinedDate}
            onChange={handleChange}
          />

          <button className="save-btn" onClick={saveProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalystProfile;