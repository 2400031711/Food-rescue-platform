import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./dashboard/Admin.css";

function AdminAnalytics() {

const [stats,setStats]=useState({
users:0,
donors:0,
recipients:0,
donations:0,
completed:0,
pending:0
});


useEffect(()=>{

const users =
JSON.parse(localStorage.getItem("users")) || [];

const donations =
JSON.parse(localStorage.getItem("donations")) || [];


const donors =
users.filter(u=>u.role==="donor").length;

const recipients =
users.filter(u=>u.role==="recipient").length;

const completed =
donations.filter(d=>d.status==="Completed").length;

const pending =
donations.filter(d=>d.status==="Pending").length;


setStats({

users:users.length,
donors,
recipients,
donations:donations.length,
completed,
pending

});

},[]);



return(

<div className="admin-container">


{/* SIDEBAR */}

<div className="admin-sidebar">

<h2>Admin Panel</h2>

<Link to="/admin-dashboard">
Dashboard
</Link>

<Link to="/manage-users">
Manage Users
</Link>

<Link to="/manage-food">
Manage Food
</Link>

<Link to="/admin-profile">
Profile
</Link>

<Link to="/admin-analytics">
Analytics
</Link>

</div>



{/* MAIN */}

<div className="admin-main">

<h1>Admin Analytics</h1>

<p className="admin-subtitle">
System statistics overview
</p>



{/* CARDS */}

<div className="admin-cards">


<div className="admin-card">

<h3>Total Users</h3>

<h2>{stats.users}</h2>

</div>


<div className="admin-card">

<h3>Total Donations</h3>

<h2>{stats.donations}</h2>

</div>


<div className="admin-card">

<h3>Completed</h3>

<h2>{stats.completed}</h2>

</div>


<div className="admin-card">

<h3>Pending</h3>

<h2>{stats.pending}</h2>

</div>


</div>



{/* GRAPHS */}

<div className="analytics-row">


{/* USERS GRAPH */}

<div className="analytics-card">

<h3>Users Distribution</h3>


<div className="bars">


<div className="bar-item">

<div
className="bar donors"
style={{height: stats.donors*15}}
></div>

<p>Donors ({stats.donors})</p>

</div>



<div className="bar-item">

<div
className="bar recipients"
style={{height: stats.recipients*15}}
></div>

<p>Recipients ({stats.recipients})</p>

</div>


</div>


</div>



{/* DONATIONS GRAPH */}

<div className="analytics-card">

<h3>Donations Status</h3>


<div className="bars">


<div className="bar-item">

<div
className="bar completed"
style={{height: stats.completed*15}}
></div>

<p>Completed ({stats.completed})</p>

</div>



<div className="bar-item">

<div
className="bar pending"
style={{height: stats.pending*15}}
></div>

<p>Pending ({stats.pending})</p>

</div>


</div>


</div>



</div>



</div>

</div>

);

}

export default AdminAnalytics;