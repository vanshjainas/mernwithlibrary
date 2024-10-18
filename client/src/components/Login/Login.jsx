import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const cookie = localStorage.getItem("cookie");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUrl = "http://localhost:2000/login";

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", { email, password });
    if (!email || !password) {
      return alert("Please enter email and password");
    }
    const response = await axios.post(loginUrl, {
      password: password,
      email: email,
    });

    const cookie = response.data.cookie;
    localStorage.setItem("cookie", cookie);
    setEmail("");
    setPassword("");
    alert("Login Successfull");
    return navigate("/");
  };
  useEffect(() => {
    if (cookie) {
      return navigate("/");
    }
  }, [cookie]);

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={formSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <div className="signup-link-wrapper">
            <h2> Don't have an account? </h2>{" "}
            <Link to="/signup" className="signup-link">
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
