import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../styles/user-login.css";
import "../styles/animations.css";

const UserLogin = () => {
 

  // Toggle Login / Register
  const [isRegister, setIsRegister] = useState(false);

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔑 eye toggle



  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/register",{username,email,password})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    
  }

  const handleLogin = (e) => {
    e.preventDefault();
    
  }


  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        <h2>{isRegister ? "Register User" : "User Login"}</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
       {isRegister && <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />}

        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

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
                  setUsername("");
                  setPassword("");
                }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              New user?{" "}
              <span
                className="register-link"
                onClick={() => {
                  setIsRegister(true);
                  setError("");
                  setUsername("");
                  setPassword("");
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

export default UserLogin;
