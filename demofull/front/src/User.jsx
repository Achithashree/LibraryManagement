import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"



const User = () => {
    const navigate=useNavigate()
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register",{username,email,password})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login",{username,email ,password})
        .then(res=>{
            console.log(res);
            navigate("/home")
        
        })

        .catch(err=>console.log(err))
    }



  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        <h2>{isRegister ? "Register User" : "User Login"}</h2>


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
            type= "password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
       
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

export default User;
