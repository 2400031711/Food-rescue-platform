import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Notifications() {

const navigate = useNavigate();

const [settings,setSettings]=useState({
email:true,
push:true,
sms:false
});


useEffect(()=>{

const saved=JSON.parse(
localStorage.getItem("notifications")
);

if(saved){
setSettings(saved);
}

},[]);



const handleChange=(type)=>{

setSettings({
...settings,
[type]:!settings[type]
});

};



const savePreferences=()=>{

localStorage.setItem(
"notifications",
JSON.stringify(settings)
);

alert("Saved Successfully ✅");

};



return(

<div className="settingsPage">

<h1>Settings</h1>

<p className="subtitle">
Manage your account settings and preferences
</p>


<div className="card">

{/* TABS */}

<div className="tabs">

<div
className="tab"
onClick={()=>navigate("/profile")}
>
👤 Profile
</div>


<div className="tab activeTab">
🔔 Notifications
</div>


<div
className="tab"
onClick={()=>navigate("/security")}
>
🛡 Security
</div>

</div>


<hr/>


<h2>Notification Preferences</h2>

<p className="smallText">
Choose how you want to receive notifications about your activity
</p>



{/* EMAIL */}

<div className="box">

<div>

<h3>Email Notifications</h3>

<p>Receive updates via email</p>

</div>

<input
type="checkbox"
checked={settings.email}
onChange={()=>handleChange("email")}
/>

</div>



{/* PUSH */}

<div className="box">

<div>

<h3>Push Notifications</h3>

<p>Receive push notifications in browser</p>

</div>

<input
type="checkbox"
checked={settings.push}
onChange={()=>handleChange("push")}
/>

</div>



{/* SMS */}

<div className="box">

<div>

<h3>SMS Notifications</h3>

<p>Receive text messages for urgent updates</p>

</div>

<input
type="checkbox"
checked={settings.sms}
onChange={()=>handleChange("sms")}
/>

</div>



<button
className="saveBtn"
onClick={savePreferences}
>

Save Preferences

</button>


</div>


</div>

);

}

export default Notifications;