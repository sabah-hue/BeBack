import React from "react";
import styles from "./Home.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Typed from 'typed.js';


export default function Home() {

  /////////////////////////////

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['and do HARD things...', ' and do HARD things...'],
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
      typeSpeed: 40,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
  
      {/* ///////////////Header section /////////////// */}
      <div className={`homeSec`}>

        <div className="col-md-6">
          <h1 className={`${styles.headFont} my-5`}>BeBack</h1>
          <h2>BeBack <span ref={el} /></h2>
          <div>
            <button className={`btn ${styles.btn1} m-2 px-4 mt-5`}>
              <Link className="text-decoration-none" to="/login">Log in</Link>
            </button>
            <button className={`btn ${styles.btn2} m-2 px-3 mt-5`}>
              <Link  className="text-decoration-none" to="/register">Register</Link>
            </button>
          </div>

        </div>

        <div  className="col-md-6">
          
        </div>
      </div>
      {/* ////////////////////// About section ///////////////////// */}
      <h1>ABOUT US</h1>
      <p>Lorem ipsum dolor sit amet.</p>
      {/* =================== End section ====================== */}

      {/* //////////////////////////// Chat section ////////////////////////// */}
      <h1>CHAT</h1>
      <p>Lorem ipsum dolor sit amet.</p>

      {/* ===================== End Chat section =====================*/}

      {/* //////////////////  Interview section ///////////////// */}
      <h1>INTERVIEW</h1>

      {/* =====================  END Interview section =================== */}

      {/* ///////////////////// Footer section ///////////////////// */}
      <Footer />
      {/* ===================== End Footer section =============== */}
 
    </>
  );
}
