import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const UserLayout = () => {
  return (
    <div className="dashboard-container">
      <UserNavbar />
      <main style={{ padding: "1px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

