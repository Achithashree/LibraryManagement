import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/animations.css";

import AdminLogin from "./auth/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageBooks from "./admin/ManageBooks";
import AddBook from "./admin/AddBook";
import Requests from "./admin/Requests";

import AdminLayout from "./components/AdminLayout";

const App = () => {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ADMIN AREA (Navbar ALWAYS here) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="books" element={<ManageBooks />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;