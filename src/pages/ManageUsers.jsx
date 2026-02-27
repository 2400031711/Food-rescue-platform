import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function ManageUsers() {

  const [users,setUsers]=useState([]);

  useEffect(()=>{

    const savedUsers=
    JSON.parse(localStorage.getItem("users"))||[];

    setUsers(savedUsers);

  },[]);



  // Delete User
  const deleteUser=(email)=>{

    const updatedUsers=
    users.filter(user=>user.email!==email);

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert("User Deleted ✅");

  };


  return(

<div className="admin-container">


{/* Sidebar */}

<div className="admin-sidebar">

<h2>Admin Panel</h2>

<Link to="/admin-dashboard">Dashboard</Link>

<Link to="/manage-users">
Manage Users
</Link>

<Link to="/manage-food">
Manage Food
</Link>

<Link to="/admin-profile">
Profile
</Link>

</div>



{/* Main */}

<div className="admin-main">

<h1>Manage Users</h1>


<table className="users-table">

<thead>

<tr>

<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>

</tr>

</thead>



<tbody>

{users.map((user,index)=>(

<tr key={index}>

<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.role}</td>

<td>

<button
className="deleteBtn"
onClick={()=>deleteUser(user.email)}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>


</div>


</div>

  );

}

export default ManageUsers;