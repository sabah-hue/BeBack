import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateUser() {
const [imgSelected, setImgSelected] = useState();
// I use cloudinary service because there is some issue in Backend integration
const uploadImage = async ()=>{
  const formData = new FormData()
    formData.append("file", imgSelected)
    formData.append("upload_preset", "eabn3dkm")

    try {
      const {data} = await axios.post("https://api.cloudinary.com/v1_1/dps8pco1z/image/upload", formData);
      console.log(data);
      if (data) {
        return data.secure_url;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
};

    const navigate = useNavigate();
    const [updateUser, setUpdateUser] = useState({
        profilePic: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    const {id} = useParams();

    useEffect(() => {
        getUser();
      }, []);
        

      const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        const imageUrl = await uploadImage();
        updateUser.profilePic = imageUrl;

        await axios.put(`http://localhost:5000/user/updateuser/${id}`, updateUser);
        navigate('/Users')
      } catch (error) {
        console.error("Error update user:", error);
      }
    };


      const getUser = async () => {
        try {
          const {data} = await axios.get(`http://localhost:5000/user/profile/${id}`);
          console.log(data.user);
          setUpdateUser({
            profilePic: data.user.profilePic,
            firstName: data.user.name.firstName,
            lastName: data.user.name.lastName,
            email: data.user.email,
          });
          
        } catch (error) {
          console.error("Error getting user from DB:", error);
        }
      };
  return (
    <div className="container p-5">
    <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100'>
       <h2 >update user Data</h2>
   </div>
   <form onSubmit={handleUpdate}>
       <div className="mb-2">
          <label htmlFor="image">Image URL:</label>
          <input
            type="file"
            name="profilePic"
            className="form-control"
            placeholder="Image URL"
           onChange={e=> setImgSelected(e.target.files[0])}
           />
       </div>

       <div className="mb-2">
           <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="first Name"
            value={updateUser.firstName}
            onChange={e=>setUpdateUser({...updateUser, firstName:e.target.value})}
           />

       </div>

       <div className="mb-2">
           <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="last Name"
            value={updateUser.lastName}
            onChange={e=>setUpdateUser({...updateUser, lastName:e.target.value})}
           />

       </div>

       <div className="mb-2">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="email"
           value={updateUser.email}
           onChange={e=>setUpdateUser({...updateUser, email:e.target.value})}
           />
       </div>


       <button className='btn btn-outline-success me-2'>update User</button>
       <Link to="/Users" className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )

}
