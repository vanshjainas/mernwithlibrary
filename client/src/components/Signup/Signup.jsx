import React, { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("cookie");

  // Define state for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [profilePic,setProfilePic ]=useState("/default.png");

  // Define state for error messages
  const [error, setError] = useState("");

  const serverBaseUrl = "http://localhost:2000"; // Replace with your actual backend URL
   
  const formSubmit = async (e) => {
    e.preventDefault();

  
    console.log("Form submitted", { name, email, password, phone, branch, admissionYear });
    try {
      const response = await axios.post(`${serverBaseUrl}/signup`, {
        name,
        email,
        password,
        phone,
        branch,
        admissionYear,
        profilePic,
      });

      console.log(response.data, "response test");

      // Assuming the backend returns success on successful signup
      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/login"); // Redirect to login after successful signup
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of the 2xx range
        console.log("Error Response:", error.response.data);
        setError(error.response.data.message || "Something went wrong. Please try again.");
      } else if (error.request) {
        // Request was made, but no response received
        console.log("Error Request:", error.request);
        setError("Server did not respond. Please try again later.");
      } else {
        // Something else happened while setting up the request
        console.log("Error Message:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (cookie) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [cookie, navigate]);

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h1 className="form-title">Create Your Account</h1>
        <p className="form-description">Sign up to access the library system and explore thousands of books!</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={formSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
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

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              name="branch"
              placeholder="Enter your branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="admissionYear">Admission Year</label>
            <input
              id="admissionYear"
              type="number"
              name="admissionYear"
              placeholder="Enter your admission year"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="login-link-wrapper">
            <p>Already have an account?</p>
            <Link to="/login" className="login-link">
              Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
