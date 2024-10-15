import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Rooms() {
    useEffect(() => {
        getAllRooms();
      }, []);
      //  get all uesrs
      const [rooms, setRooms] = useState([]);
    
      const getAllRooms = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/chat/rooms");
          setRooms(data);
          console.log(data);
        } catch (error) {
          console.error("Error getting users from DB:", error);
        }
      };
      //  delete user
      const handleDelete = async (id) => {
        const confirm = window.confirm(
          "Are you realy need to delete this record ? "
        );
        if (confirm) {
          await axios.delete(`http://localhost:5000/chat/room/${id}`);
         window.location.reload();
        }
      };
    
    
      return (
        <div className="container p-5">
          <div className={`container p-5 bg-white shadow-lg rounded-2 `}>
            <div>
              {/* //////////////// buttons///////////////// */}
        
                <div>
                  <div className="container">
                    {/* ///////////user table////////////// */}
                    <div className="p-5 d-flex flex-column justify-content-center align-items-center bg-light">
                      <h1>List of Rooms</h1>
                      <div className="w-100 rounded bg-white border shadow p-4">
                        <div className="d-flex justify-content-between mb-5">
                        <Link to="/dashboard" className="btn btn-outline-success">
                           Back
                          </Link>

                        </div>
                        <table className="bg-light text-center table table-striped">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rooms.rooms?.map((room) => (
                              <tr key={room._id}>
                                <td>{room.name}</td>
                                <td>
                                  <button
                                    onClick={(e) => handleDelete(room._id)}
                                    className="btn btn-danger"
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </button>
                                  <Link
                                    to={`/updateroom/${room._id}`}
                                    className="btn btn-warning mx-2"
                                  >
                                    <i className="far fa-edit"></i>{" "}
                                  </Link>

                                  <Link
                                    to={``}
                                    className="btn btn-success mx-2"
                                  >
                                    <i className="far fa-plus"></i>{" "}
                                  </Link>
                                </td>
                              
                              
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
    
                    {/* /////////////////////////////////// */}
                  </div>
                </div>
             
            </div>
          </div>
        </div>
      );
    
}
