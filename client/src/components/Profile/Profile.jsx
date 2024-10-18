import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("cookie");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myPhone, setMyPhone] = useState("");
  const [myBranch, setMyBranch] = useState("");
  const [myAdmissionYear, setMyAdmissionYear] = useState("");
  const [apiCall, setApiCall] = useState(0);
  const [profilePic, setProfilePic] = useState("/default.png");

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
      const { name, email, phone, branch, admissionYear ,profilePic } = response.data;
      setMyEmail(email);
      setMyName(name);
      setMyPhone(phone);
      setMyBranch(branch);
      setMyAdmissionYear(admissionYear);
      setProfilePic(profilePic);
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
        phone: myPhone,
        branch: myBranch,
        admissionYear: myAdmissionYear,
        profilePic: profilePic ,
      });

      alert("Profile Updated Successfully");
      setIsEditing(false);
      setApiCall((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 1 * 1024 * 60; // 1MB in bytes
  
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds 60kb. Please select a smaller file.");
        e.target.value = null; // Reset the file input
      } else {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result); 
      setProfilePic(reader.result);
      };
      reader.onerror= error => {
      console.log("Error: ", error);
      }; 
      console.log("File is within size limit:", file);
      // You can now set the file to state or do any further actions
    }
  }
  };

  useEffect(() => {
    if (!cookie) {
      return navigate("/login");
    }
  }, [cookie]);

  return (
    <div><Navbar />
    <div className="profile-container">
    <div className="profile-content">
        <div className="profile-image">
            <div className="image">
                <img src={profilePic} alt="Profile" />
                {isEditing && (
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        id="file-path"
                        className="user-file"
                        onChange={handleFileChange}
                    />
                )}
            </div>
        </div>
        <div className="profile-details">
            <h1>Profile Page</h1>
            {loading ? (
                <div className="loading">
                    <h3>Loading....</h3>
                </div>
            ) : (
                <div className="profile-form">
                    <div className="form-group">
                        <label>My Name</label>
                        <input
                            placeholder="My Name"
                            type="text"
                            id="myName"
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
                            onChange={(e) => setMyEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            placeholder="Phone"
                            type="text"
                            id="myPhone"
                            value={myPhone}
                            onChange={(e) => setMyPhone(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Branch</label>
                        <input
                            placeholder="Branch"
                            type="text"
                            id="myBranch"
                            value={myBranch}
                            onChange={(e) => setMyBranch(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="form-group">
                        <label>Admission Year</label>
                        <input
                            placeholder="Admission Year"
                            type="number"
                            id="myAdmissionYear"
                            value={myAdmissionYear}
                            onChange={(e) => setMyAdmissionYear(e.target.value)}
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
</div>
</div>

  );
}

export default Profile;
