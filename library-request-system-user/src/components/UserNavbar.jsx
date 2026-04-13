import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/user-navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("loggedUser"); // ✅ correct key
    navigate("/login");
  };

  return (
    <div className="nav-head">
      <nav className="user-navbar">
        
        {/* Logo */}
        <div
          className="nav-logo"
          onClick={() => window.dispatchEvent(new Event("dashboard:home"))}
        >
          📚 StoryVerse
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <button
            className="icon-btn logout"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

      </nav>
    </div>
  );
};

export default UserNavbar;
