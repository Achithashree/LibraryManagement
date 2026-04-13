import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/animations.css";

import UserLogin from "./auth/UserLogin";
import UserDashboard from "./user/UserDashboard";
import UserLayout from "./components/UserLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<UserLogin />} />

      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
