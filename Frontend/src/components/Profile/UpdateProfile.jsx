import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProfile({ userData }) {
  const navigate = useNavigate();
  const [imgSelected, setImgSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
  });
  
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imgSelected);
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);

      const { data } = await axios.put(`http://localhost:5000/user/update/${id}`, formData);
      if (data) {
        navigate(`/profile/${id}`);
      }
    } catch (error) {
      setError("Error updating user data. Please try again.");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/user/profile/${id}`);
      const existUser = data.user.name;
      setUpdateUser({ ...existUser, profilePic: data.user.profilePic });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data.");
    }
  };

  return (
    <div className="container p-5">
      <div className="w-50 bg-white shadow px-5 mt-4 mb-4 ">
        <h2>Update User Data</h2>
      </div>

      {error && <p className="text-danger">{error}</p>}

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
            required
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
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input 
            type="file" 
            name="profilePic" 
            className="form-control" 
            onChange={e => setImgSelected(e.target.files[0])}
          />
          {updateUser.profilePic && (
            <div className="mt-2">
              <img src={updateUser.profilePic} alt="Profile Preview" width="100" />
            </div>
          )}
        </div>

        <button className="btn btn-outline-success me-2" disabled={loading}>
          {loading ? "Updating..." : "Update User"}
        </button>
        <Link to={`/profile/${id}`} className="btn btn-outline-primary">Back</Link>
      </form>
    </div>
  );
}
