import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("cookie");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [apiCall, setApiCall] = useState(0);
  const myCookie = localStorage.getItem("cookie");
  const getDetailsAPi =
    "http://localhost:2000/profile-details?" + "myCookie=" + myCookie;

  const updateProfileApi =
    "http://localhost:2000/update-profile?" + "myCookie=" + myCookie;

  const startEditing = () => {
    setIsEditing(true);
  };

  const getMyProfileDetails = async () => {
    try {
      const response = await axios.get(getDetailsAPi);
      const name = response.data.name;
      const email = response.data.email;
      setMyEmail(email);
      setMyName(name);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfileDetails();
  }, [apiCall]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(updateProfileApi, {
        email: myEmail,
        name: myName,
      });

      alert("Profile Updated Successfully");
      setIsEditing(false);
      setApiCall((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cookie) {
      return navigate("/login");
    }
  }, [cookie]);

  return (
    <div className="profile-layout">
      <Navbar />
      <div className="profile-container">
        <h1>Profile Page</h1>
        {loading ? (
          <div className="loading">
            <h3>Loading....</h3>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label>My Name</label>
              <input
                placeholder="My Name"
                type="text"
                id="myName"
                name="myName"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>My Email</label>
              <input
                placeholder="My Email"
                type="email"
                id="myEmail"
                value={myEmail}
                name="myEmail"
                onChange={(e) => setMyEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <button onClick={updateProfile} className="save-btn">
                Save Changes
              </button>
            ) : (
              <button onClick={startEditing} type="button" className="edit-btn">
                Edit Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
