import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateUserProfile() {
// loading
const [loading, setLoading] = useState(false);

const [imgSelected, setImgSelected] = useState(null);
const [chatImgSelected, setChatImgSelected] = useState(null);

// I use cloudinary service because there is some issue in Backend integration
const uploadImage = async (value)=>{
    const formData = new FormData()
      formData.append("file", value)
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

  //
    const navigate = useNavigate();
    const [updateUser, setUpdateUser] = useState({
        profilePic: "",
        firstName: "",
        lastName: "",
        email: "",
        chatBio: "",
        chatPic: "",
      });
    const {id} = useParams();

    useEffect(() => {
        getUser();
      }, []);
        

      const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        // start loading
        setLoading(true);

        // upload profile and pic images
        const imageUrl = await uploadImage(imgSelected);
        console.log(imageUrl);
        updateUser.profilePic = imageUrl;
        const chatUrl = await uploadImage(chatImgSelected);
        console.log(chatUrl);
        updateUser.chatPic = chatUrl;

        await axios.put(`http://localhost:5000/user/updateuserprofile/${id}`, updateUser);
        // end loading
        setLoading(false);
        navigate(`/profile/${id}`)
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
            chatBio: data.user.chatBio,
            chatPic: data.user.chatPic,
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
          <label htmlFor="profilePic">Image URL:</label>
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

       <div className="mb-2">
          <label htmlFor="chatBio">Bio:</label>
          <input
            type="text"
            name="chatBio"
            className="form-control"
            placeholder="your thoughts ..."
           value={updateUser.chatBio}
           onChange={e=>setUpdateUser({...updateUser, chatBio:e.target.value})}
           />
       </div>

       <div className="mb-2">
          <label htmlFor="chatPic">chat picture:</label>
          <input
            type="file"
            name="chatPic"
            className="form-control"
            placeholder="chat picture"
           onChange={e=> setChatImgSelected(e.target.files[0])}
           />
       </div>

       <button className='btn btn-outline-success me-2'>
        {!loading ? 'update User' : <i className='fas fa-spinner fa-spin'></i>}
        </button>
       <Link to={`/Profile/${id}`} className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )

}
