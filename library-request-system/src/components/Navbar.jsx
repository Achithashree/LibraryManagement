import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <header className="admin-navbar">
      <h1
        className="nav-logo"
        onClick={() => window.dispatchEvent(new Event("dashboard:home"))}
      >
        📚 StoryVerse
      </h1>

      <button className="icon-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Navbar;
