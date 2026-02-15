import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 
import { UserContext } from "./userContext";
import "./style/Login.css";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/home");
      }, 800);

    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("User not found");
      } else if (error.response?.status === 401) {
        toast.error("Incorrect password");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="parent">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="left">
          <div className="column-1">
            <img className="logo" src="assets/2.png" alt="Logo" />
            <div className="span">
              <h1 className="text">Sign in to</h1>
              <h2 className="text highlight">Quiz Web Application</h2>
              <div className="Paragraphs">
                <p className="div-1">Don’t have an account?</p>
                <p className="div-2">
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>

          <div className="column-2">
            <img src="assets/1.png" className="img" alt="Illustration" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <h1 className="div-3">Sign In</h1>

          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;