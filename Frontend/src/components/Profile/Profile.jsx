import React, { useEffect, useState } from "react";
import './Profile.css';
import axios from "axios";
import { Link, useParams } from 'react-router-dom'

export default function Profile({ userData, userToken }) {
  const {id: paramId} = useParams();
  const id = paramId || userData?.id;
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserProfile();
  }, [id, userToken]);

  const getUserProfile = async () => {
    try {
      console.log(userToken);
      let { data } = await axios.get(`http://localhost:5000/user/profile/${id}`, {headers : { 
        authorization: `${userToken}`}});
      console.log("Fetched user data:", data);
      
      if (data && data.user) {
        setUserProfile(data.user);
      } else {
        console.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user profile Data:", error);
    }
  };

  const renderProfileInfo = () => {
    if (!Object.keys(userProfile).length) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className="profile-header">
          <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
          <h1>{`${userProfile.name?.firstName} ${userProfile.name?.lastName}`}</h1>
        </div>

        <div className="profile-info">
          <h2>Personal Information</h2>
          <p><strong>First Name:</strong> {userProfile.name?.firstName}</p>
          <p><strong>Last Name:</strong> {userProfile.name?.lastName}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Bio:</strong> {userProfile.chatBio}</p>
          <p><strong>chat picture:</strong></p>
          <img src=
           {userProfile.chatPic ? userProfile.chatPic : `${`https://ui-avatars.com/api/?name=${userProfile.name?.firstName}`}`}
          className="pic-chat rounded-circle shadow-lg" />
        </div>

        <div className="rooms-section">
          <h2>Rooms</h2>
          <ul>
            {userProfile.rooms && Array.isArray(userProfile.rooms) && userProfile.rooms.length > 0 ? (
              userProfile.rooms.map((room, index) => <li key={index}>{room}</li>)
            ) : (
              <li>No rooms joined yet</li>
            )}
          </ul>
          <div>
            <button className="btn btn-outline-warning me-auto">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </button>

            <button className="btn mx-2 me-auto">
            <Link className="nav-link" aria-current="page" to={`/updateuserprofile/${userData?.id}`}>
            <i className="far fa-edit"></i>
            </Link>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="profile-container">
      {renderProfileInfo()}
    </div>
  );
};
