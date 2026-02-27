import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";

function Profile() {

const navigate = useNavigate();


/* PROFILE DATA STATE */

const [profile,setProfile]=useState({

name:"",
email:"",
phone:"",
organization:"",
address:""

});


/* PHOTO STATE */

const [photo,setPhoto]=useState("");



/* LOAD DATA */

useEffect(()=>{

const savedProfile=
JSON.parse(localStorage.getItem("profile")) || {};

setProfile(savedProfile);


const savedPhoto=
localStorage.getItem("profilePhoto");

if(savedPhoto){
setPhoto(savedPhoto);
}

},[]);



/* INPUT CHANGE */

const handleChange=(e)=>{

setProfile({

...profile,
[e.target.name]:e.target.value

});

};



/* SAVE PROFILE */

const saveProfile=()=>{

localStorage.setItem(
"profile",
JSON.stringify(profile)
);

alert("Profile Saved Successfully ✅");

};



/* CHANGE PHOTO */

const changePhoto=(e)=>{

const file=e.target.files[0];

const reader=new FileReader();

reader.onloadend=()=>{

localStorage.setItem(
"profilePhoto",
reader.result
);

setPhoto(reader.result);

};

if(file){
reader.readAsDataURL(file);
}

};



return (

<div className="dashboard-container">


{/* HEADER */}

<div className="dashboard-header">

<h2>FoodLink</h2>

<button
className="dashboard-btn"
onClick={()=>navigate("/dashboard")}
>
Dashboard
</button>

</div>



<div className="profile-main-card">


{/* Tabs */}

<div className="profile-tabs">

<span
className="active-tab"
onClick={()=>navigate("/profile")}
>
Profile
</span>

<span
onClick={()=>navigate("/notifications")}
>
Notifications
</span>

<span
onClick={()=>navigate("/security")}
>
Security
</span>

</div>



{/* Profile Header */}

<div className="profile-header">


<div className="profile-avatar">

{photo ? (

<img
src={photo}
className="avatar-img"
/>

):"👤"}

</div>


<div>

<h3>{profile.name || "Donor"}</h3>

<p>{profile.email || "donor@email.com"}</p>


<label className="change-photo">

Change Photo

<input
type="file"
onChange={changePhoto}
hidden
/>

</label>

</div>

</div>



{/* FORM */}

<div className="profile-form">


<div className="form-row">

<div>

<label>Full Name</label>

<input
name="name"
value={profile.name}
onChange={handleChange}
/>

</div>


<div>

<label>Email Address</label>

<input
name="email"
value={profile.email}
onChange={handleChange}
/>

</div>


</div>



<div className="form-row">


<div>

<label>Phone Number</label>

<input
name="phone"
value={profile.phone}
onChange={handleChange}
/>

</div>


<div>

<label>Organization</label>

<input
name="organization"
value={profile.organization}
onChange={handleChange}
/>

</div>


</div>



<label>Address</label>

<textarea
name="address"
value={profile.address}
onChange={handleChange}
/>



<button
className="save-btn"
onClick={saveProfile}
>

Save Changes

</button>


</div>


</div>


</div>

);

}

export default Profile;