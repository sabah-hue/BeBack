import React from "react";
import styles from "./About.module.scss";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="container" id="#aboutSec">
        <div className={`${styles.contact} py-5`} id="cont-id">
          <div className={`${styles.constTitle} text-center mb-5`}>
            <h3 className="mb-2">About Us...</h3>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {/* /////////////////// */}

                <div className="bg-white shadow-lg rounded-2">
                  <div
                    id="carouselExampleInterval"
                    className="carousel slide "
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active"
                        data-bs-interval="1500"
                      >
                        <img
                          src={require("./pexels-ahmedelbetar-4898084.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="1500">
                        <img
                          src={require("./pexels-ahmedelbetar-4898083.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                      <div className="carousel-item" data-bs-interval="1500">
                        <img
                          src={require("./pexels-ahmedelbetar-4898083.jpg")}
                          className="d-block w-100 rounded-2"
                          alt="..."
                        />
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleInterval"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

                {/* /////////////////// */}
              </div>

              <div className="col-md-6">
                <div className="">
                  <h3>
                    Handmade treasures are more than just objects; they are
                    expressions of creativity and dedication, reflecting the
                    artisan's journey and the values they uphold.
                  </h3>
                  <h2 className="text-center">
                    We are the gate to your market ...
                  </h2>
                  <h3>
                    if you an artisian and didn't know how to sell your products
                  </h3>
                  <h3>
                    hurry up and join us.
                  </h3>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <Link to="/register"><button className="btn btn-danger px-5 py-2">Join Us</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
