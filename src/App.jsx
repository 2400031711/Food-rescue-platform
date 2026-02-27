import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import RoleSelection from "./pages/RoleSelection";

// Dashboards
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import RecipientDashboard from "./pages/dashboard/RecipientDashboard";

import AnalystDashboard from "./pages/dashboard/AnalystDashboard";

import AnalystProfile from "./pages/dashboard/AnalystProfile";


<Route
  path="/analyst-dashboard"
  element={<AnalystDashboard />}
/>

// Donor Features
import AddDonation from "./pages/dashboard/AddDonation";
import MyDonations from "./pages/dashboard/MyDonations";
import Profile from "./pages/dashboard/Profile";
import Notifications from "./pages/Notifications";
import Security from "./pages/security";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageDonations from "./pages/dashboard/ManageDonations";
import AdminProfile from "./pages/dashboard/AdminProfile";
import AdminAnalytics from "./pages/AdminAnalytics";




function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/role" element={<RoleSelection />} />

        {/* Dashboards */}
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
        

        {/* ✅ Donor Actions */}
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DonorDashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/security" element={<Security/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
       
        
        <Route
  path="/manage-food"
  element={<ManageDonations />}
/>
<Route
  path="/analyst-profile"
  element={<AnalystProfile />}
/>
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;