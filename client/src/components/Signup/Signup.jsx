import React, { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("cookie");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const serverBaseUrl = "http://localhost:2000";

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", { name, email, password });

    try {
      const response = await axios.post(serverBaseUrl + "/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data, "response test");
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    if (cookie) {
      return navigate("/");
    }
  }, [cookie]);

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit={formSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="login-link-wrapper">
            <h2> Already have an account? </h2>{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
