import React , { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';
import { Link } from 'react-router-dom';


export default function Register() {
  // tostify
  const notify = (message, type) => toast[type](`${message}`);

  // navigation
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = useState(false);

    // validate data
    let validate = (values) => {
      let errors = {};
      if (values.firstName === '') {
        errors.firstName = '*first name is required';
      } else if (values.firstName.length < 3 || values.firstName.length > 15) {
        errors.firstName = '*Must be not less than 3 characters and not more than 15 characters';
      }
      if (values.lastName === '') {
        errors.lastName = '*last name is required';
      } else if (values.lastName.length < 3 || values.lastName.length > 15) {
        errors.lastName = '*Must be not less than 3 characters and not more than 15 characters';
      }
      if (values.email === '') {
       errors.email = '*email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '*Invalid email address';
      }
      if (values.password === '') {
        errors.password = '*password is required';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
        errors.password = '*password must be at least 8 char , 1 letter and 1 number';
      }
      if (values.cpassword === '') {
        errors.cpassword = 'confirm password is required';
      } else if (values.password !== values.cpassword) { 
        errors.cpassword = 'confirm password not match';
      }
      return errors;
    } 
  // get data from form
  let regData = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        // start loading
        setLoading(true);
        const {data} = await axios.post('http://localhost:5000/auth/signup', userData);
        console.log(data);
        // end loading
         setLoading(false);
        if (data.message !== 'please, Confirm your account') {
          notify(data.message, 'warning');
        }

        if (data.message === 'please, Confirm your account') {
          notify(data.message, 'success');
          navigate('/login');
        }

        
      } catch (error) {
        console.log('Registration error:', error);
        // end loading
        setLoading(false);
        notify(error.response.data.message, 'error');
      }
    }
  });

  return (
    <>
      <div className="w-50 m-auto bg-body p-2 mt-4 border-2 shadow-lg">
      <div className="m-auto m-5 p-5">
        <h1>Register <span className='title-h2'>Form</span></h1>
        <h3 className='text-muted'><span className='title-h2'>Join</span> your family</h3>
      <hr />
        <form className="row g-3" onSubmit={regData.handleSubmit}>
  <div className="col-md-6">
    <input type="text" onBlur={regData.handleBlur} onChange={regData.handleChange}  value={regData.values.firstName} className="form-control" placeholder='First name'  name='firstName'/>
    {regData.errors.firstName && regData.touched.firstName ? <div className="text-danger">{regData.errors.firstName}</div> : null}
  </div>
  <div className="col-md-6">
    <input type="text" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.lastName} className="form-control" placeholder='Last name'  name='lastName'/>
    {regData.errors.lastName && regData.touched.lastName ? <div className="text-danger">{regData.errors.lastName}</div> : null}
  </div>
    <div className="col-md-12">
    <input type="email" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.email} className="form-control" placeholder='Email'   name='email'/>
    {regData.errors.email && regData.touched.email ? <div className="text-danger">{regData.errors.email}</div> : null}
    </div>

    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.password} className="form-control" placeholder='password' name='password'/>
    {regData.errors.password && regData.touched.password ? <div className="text-danger">{regData.errors.password}</div> : null}
    </div>
    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.cpassword} className="form-control" placeholder='confirm password' name='cpassword'/>
    {regData.errors.cpassword && regData.touched.cpassword ? <div className="text-danger">{regData.errors.cpassword}</div> : null}
    </div>

  <div className="col-12">
    <button className="btn bg-main text-white" type="submit" disabled={!(regData.isValid && regData.dirty && !loading)}>
      {!loading ? 'Register' : <i className='fas fa-spinner fa-spin'></i>}
    </button>
    <Link className="nav-link text-primary my-2" to="/login">Already have an acount ? got ot login</Link>

  </div>
</form>

      </div>
      </div>
    </>

  )
}
