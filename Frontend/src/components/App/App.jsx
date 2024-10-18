import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Login from '../Login/Login';
import ChangePassword from '../Login/ChangePassword';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Users from '../Dashboard/User';
import UpdateUser from '../Dashboard/UpdateUser';
import Rooms from '../Dashboard/Rooms';
import UpdateRoom from '../Dashboard/UpdateRoom';
import CreateRoom from '../Dashboard/CreateRoom';
import Profile from '../Profile/Profile';
import UpdateUserProfile from '../Profile/UpdateUserProfile';
import UpdateProfile from '../Profile/UpdateProfile';
import Notfound from '../Notfound/Notfound';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {Online, Offline} from 'react-detect-offline';
import Chat from '../Chat/Chat';
import Base from '../Chat/Base';
import axios from 'axios';


import Interview from '../Interview/Interview';


function App() {
const [userData, setUserData] = useState(null);
const [userToken, setUserToken] = useState(null);

// decode token to get user Data
  let saveUserData= ()=>{
    let encodedToken = localStorage.getItem('token');
    setUserToken(`Bearer ${encodedToken}`);
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };

// prevent refresh behaviour set null to userData but the user has data in localstorage
useEffect(()=>{
  if(localStorage.getItem('token'))
  {
    saveUserData();
  }
}, []);

// in logout remove data from localstorage, got to home page
let logoutUser = async ()=>{
  try {
    const response = await axios.post('http://localhost:5000/auth/logout', {id: userData.id});
  if (response.status === 200){
    localStorage.removeItem('token');
    setUserData(null);
    toast.success('logOut successfully');
    return <Navigate to='/' />
  }
} catch (err) {
  toast.error('error logOut');
}
};
//  routes
  let routes = createBrowserRouter([
    {path:'/', element:<Layout userData={userData} logoutUser={logoutUser}/>, errorElement:<Notfound />, children:[
      {index:true, element:<Home userData={userData}/>},
      {path:'login', element:<Login saveUserData={saveUserData}/>},
      {path:'ChangePassword', element:<ChangePassword/>},
      {path:'register', element:<Register />},
      {path:'chat', element:<ProtectedRoute userData={userData}><Chat userData={userData} userToken={userToken}/></ProtectedRoute>},
      {path:'base', element:<ProtectedRoute userData={userData}><Base userData={userData} userToken={userToken}/></ProtectedRoute>},
      {path:'interview', element:<ProtectedRoute userData={userData}><Interview /></ProtectedRoute>},
      {path:'profile/:id', element:<ProtectedRoute userData={userData}><Profile userData={userData} userToken={userToken}/></ProtectedRoute>},
      {path:'update/:id', element:<ProtectedRoute userData={userData}><UpdateProfile userData={userData} userToken={userToken}/></ProtectedRoute>},
      {path:'dashboard', element:<ProtectedRoute userData={userData}><Dashboard userData={userData} userToken={userToken}/></ProtectedRoute>},
      {path:'users', element:<ProtectedRoute userData={userData}><Users userToken={userToken}/></ProtectedRoute>},
      {path:'updateuserprofile/:id', element:<ProtectedRoute userData={userData}><UpdateUserProfile userToken={userToken}/></ProtectedRoute>},
      {path:'updateuser/:id', element:<ProtectedRoute userData={userData}><UpdateUser userToken={userToken}/></ProtectedRoute>},
      {path:'rooms', element:<ProtectedRoute userData={userData}><Rooms userToken={userToken}/></ProtectedRoute>},
      {path:'createroom', element:<ProtectedRoute userData={userData}><CreateRoom userToken={userToken}/></ProtectedRoute>},
      {path:'updateroom/:id', element:<ProtectedRoute userData={userData}><UpdateRoom userToken={userToken}/></ProtectedRoute>},

    ]}
  ])
  return (
    <>
    <div>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

    <RouterProvider router={routes} />

      {/* <Online>
        <RouterProvider router={routes} />
      </Online>
      <Offline>you are offline</Offline> */}
    </div>
    </>
  );
}

export default App;
