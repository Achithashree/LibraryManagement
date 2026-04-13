import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/animations.css";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Load admins from localStorage or default file


  // 🔐 LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/admin/login", {name,password})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  };

  // 🆕 REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/admin",{name,password})
    .then(res=>{
      console.log(res)}
    
    )
    .catch(err=>console.log(err))};


  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        <h2>{isRegister ? "Register Admin" : "Admin Login"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="register-text">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span
                className="register-link"
                onClick={() => {
                  setIsRegister(false);
                  setError("");
                }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              New admin?{" "}
              <span
                className="register-link"
                onClick={() => {
                  setIsRegister(true);
                  setError("");
                }}
              >
                Register here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
