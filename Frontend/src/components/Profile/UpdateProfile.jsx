import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProfile({ userData }) {
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
    email: "",
    profilePic: "",
  });
  
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/user/update/${id}`, updateUser);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/user/profile/${id}`);
      console.log(data);
      setUpdateUser({
        firstName: data.user.name.firstName || "",
        lastName: data.user.name.lastName || "",
        email: data.user.email || "",
        oldPassword:"",
        newPassword: "",
        profilePic: data.user.profilePic || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateUser({ ...updateUser, profilePic: file });
  };

  return (
    <div className="container p-5">
      <div className="w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100">
        <h2>Update User Data</h2>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            className="form-control" 
            placeholder="First Name"
            value={updateUser.firstName}
            onChange={e => setUpdateUser({ ...updateUser, firstName: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            className="form-control" 
            placeholder="Last Name"
            value={updateUser.lastName}
            onChange={e => setUpdateUser({ ...updateUser, lastName: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            placeholder="Email"
            value={updateUser.email}
            onChange={e => setUpdateUser({ ...updateUser, email: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="newPassword">old password:</label>
          <input 
            type="password" 
            name="oldPassword" 
            className="form-control"
            placeholder="old password"
            value=""
            onChange={e => setUpdateUser({ ...updateUser, oldPassword: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="newPassword">new password:</label>
          <input 
            type="password" 
            name="newPassword" 
            className="form-control"
            placeholder="new password"
            value=""
            onChange={e => setUpdateUser({ ...updateUser, newPassword: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input 
            type="file" 
            name="profilePic" 
            className="form-control" 
            onChange={handleFileChange} 
          />
          {updateUser.profilePic && (
            <div className="mt-2">
              <img src={updateUser.profilePic} alt="Profile Preview" width="100" />
            </div>
          )}
        </div>

        <button className="btn btn-outline-success me-2">Update User</button>
        <Link to={`/profile/${userData.id}`} className="btn btn-outline-primary">Back</Link>
      </form>
    </div>
  );
}
