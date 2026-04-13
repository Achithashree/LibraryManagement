import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/dashboard.css";

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
