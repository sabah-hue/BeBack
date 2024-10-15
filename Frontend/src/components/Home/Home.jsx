import React from "react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Typed from 'typed.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEye, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";
import Contact from './Contact';
import { toast } from 'react-toastify';


export default function Home({userData}) {
// tostify
const notify = (message, type) => toast['warning']('please, login first ...');

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['do HARD things...', 'welcome to your home...', 'strong community ...', 'have a nice time ...'],
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
      typeSpeed: 40,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>      
      {/* Header Section */}
      <div className="homeSec text-center">
        <h1 className="headFont my-5">BeBack</h1>
        <h2 className="start-type">
          BeBack <span className="typer" ref={el} />
        </h2>
       {userData ?   (
              <>
              </>
            ) : (<div>
          <button className="btn btn-warning m-2 px-4 mt-5">
            <Link className="text-decoration-none" to="/login">Log in</Link>
          </button>
          <button className="btn btn-outline-warning m-2 px-3 mt-5">
            <Link className="text-decoration-none" to="/register">Register</Link>
          </button>
        </div> )}
      </div>

      {/* About Us Section */}
      <div className="container my-5">
        <h1 className="text-center">ABOUT US</h1>
        <hr className="w-25 m-auto my-3" />
        <div className="row">
          <div className="col-md-6 text-center">
            <div className='flipcard'>
              <div className='flipcardfront'>
                <div className='inner'>
                  <h2 className="text-white">Join chat rooms</h2>
                </div>
              </div>
              <div className='flipcardback'>
                <div className='inner'>
                  <h2 className="text-white">pick Interview</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h1 className="text-center">BeBack</h1>
              <p>
                At BeBack, we strive to build a vibrant community for backend developers. Our mission is to facilitate collaboration, share knowledge, and foster growth through engaging discussions and support. Whether you’re looking to enhance your skills or connect with like-minded individuals, BeBack is the place for you.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Our Mission
                </h5>
                <p className="card-text">To create a community where backend developers can connect, collaborate, and grow their skills.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Our Vision
                </h5>
                <p className="card-text">Empowering developers to challenge and innovate in a supportive environment.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                  Our Values
                </h5>
                <p className="card-text">Integrity, Collaboration, Innovation, and Growth are important to create a strong community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="my-5 chat py-3">
        <div className="container my-5 chat">
          <h1 className="text-center">CHAT</h1>
          <hr className="w-25 m-auto my-3" />
          <div className="text-center">
            <p>
              Meet expert and professional engineers, select your technology and enter the chat room.
              
              {userData ? (<>
                <button className="btn btn2 m-2 px-3 mt-5">
                <Link className="text-decoration-none" to="/base">Join chat room</Link>
              </button>
              </>) : (<>
                <button className="btn btn2 m-2 px-3 mt-5" onClick={notify}>
                <Link className="text-decoration-none" to="/login">Join chat room</Link>
              </button>
              </>)}

            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Join Discussions
                  </h5>
                  <p className="card-text">Engage in real-time discussions with fellow developers in dedicated rooms.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                    Share Knowledge
                  </h5>
                  <p className="card-text">Exchange ideas, tips, and best practices to enhance your skills.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Get Support
                  </h5>
                  <p className="card-text">Seek help from experienced developers for your projects and challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Section */}
      <div className="container my-5">
        <h1 className="text-center">INTERVIEW</h1>
        <hr className="w-25 m-auto my-3" />
        <div className="text-center">
          <p>
            Don't waste the chance, fill your form and practice with professional engineers.
            {userData ? (<>
                <button className="btn btn2 m-2 px-3 mt-5">
                <Link className="text-decoration-none" to="/interview">Interview section</Link>
                </button>
              </>) : (<>
                <button className="btn btn2 m-2 px-3 mt-5" onClick={notify}>
                <Link className="text-decoration-none" to="/login">Interview section</Link>
                </button>
              </>)}
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faLightbulb} className="me-2" />
                  Mock Interviews
                </h5>
                <p className="card-text">Prepare for your interviews with simulated sessions and feedback.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  Interview Tips
                </h5>
                <p className="card-text">Learn strategies and tips to excel in technical interviews.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Real Experiences
                </h5>
                <p className="card-text">Gain insights from others' interview experiences and learn from their stories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </>
  );
}
