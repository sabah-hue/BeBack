import React from 'react'
import './Interview.css'
import { Link } from "react-router-dom";


export default function Interview() {
  return (
    <>
    <div className='container'>
        <div className="row py-5">
            {/* interviewer */}
            <div className="col-md-6 text-center">
            <div className='shadow-lg py-5 col-md-11'>
            <h2>Hi volunter</h2>
            <h3>Nice to work with us</h3>
            <hr className='w-50 m-auto py-3'/>

            <div className='d-flex justify-content-center'>

            <div className='flipcard'>
      <div className='flipcardfront'>
        <div className='inner'>
          <h3>Interviewer</h3>
        </div>
      </div>
      <div className='flipcardback'>
        <div className='inner'>
          <p>
            We appriciate your efforts
            <br />
            <button className='btn btn-success mt-4'>Join us</button>
            <br />
          </p>
        </div>
      </div>
    </div>
    </div>
            </div>

            </div>
            {/* iterviewee */}
            <div className="col-md-6 text-center">
            <div className='shadow-lg py-5 col-md-11'>
            <h2>Need to pass your Interview</h2>
            <h3>fell free to Join Us</h3>
            <hr className='w-50 m-auto py-3'/>

            <div className='d-flex justify-content-center'>
             <div className='flipcard'>
                <div className='flipcardfront'>
        <div className='inner '>
          <h3>Interviewee</h3>
        </div>
      </div>
      <div className='flipcardback'>
        <div className='inner'>
          <p>
            We appriciate your efforts
            <br />
            <button className='btn btn-success mt-4'>Join us</button>
            <br />
          </p>
        </div>
      </div>
    </div>
            </div>
</div>
            </div>
        </div>
    </div>
    </>
  )
}
