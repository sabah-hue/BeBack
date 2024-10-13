import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import UpdateProfile from '../Profile/UpdateProfile';
import Notfound from '../Notfound/Notfound';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {Online, Offline} from 'react-detect-offline';
import Chat from '../Chat/Chat';
import Base from '../Chat/Base';

import Interview from '../Interview/Interview';


function App() {
const [userData, setUserData] = useState(null);

// decode token to get user Data
  let saveUserData= ()=>{
    let encodedToken = localStorage.getItem('token');
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
let logoutUser = ()=>{
  localStorage.removeItem('token');
  setUserData(null);
  return <Navigate to='/' />

};
//  routes
  let routes = createBrowserRouter([
    {path:'/', element:<Layout userData={userData} logoutUser={logoutUser}/>, errorElement:<Notfound />, children:[
      {index:true, element:<Home userData={userData}/>},
      {path:'login', element:<Login saveUserData={saveUserData}/>},
      {path:'register', element:<Register />},
      {path:'chat', element:<ProtectedRoute userData={userData}><Chat /></ProtectedRoute>},
      {path:'base', element:<ProtectedRoute userData={userData}><Base userData={userData}/></ProtectedRoute>},
      {path:'interview', element:<ProtectedRoute userData={userData}><Interview /></ProtectedRoute>},
      {path:'profile/:id', element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
      {path:'update/:id', element:<ProtectedRoute userData={userData}><UpdateProfile userData={userData}/></ProtectedRoute>},
      {path:'dashboard', element:<Dashboard userData={userData}/>}
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
