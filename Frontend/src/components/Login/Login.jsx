import React , { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Register/Register.css';


export default function Login({saveUserData}) {
  // tostify
  const notify = (message, type) => toast[type](`${message}`);

  // navigation
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = useState(false);

    // validate data
    let validate = (values) => {
      let errors = {};

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
      return errors;
    } 
  // get data from form
  let regData = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        // start loading
        setLoading(true);
        const {data} = await axios.post('http://localhost:5000/auth/login', values)
        console.log(data);
        // Handle successful registration (chesk success message, redirect)

        // end loading
         setLoading(false);
        if (data.message !== 'please, Confirm your account' && data.message !== 'login success') {
          notify(data.message, 'warning');
        }

        if (data.message === 'login success') {
          //localStorage
          localStorage.setItem("token", data.token);
          saveUserData();
          notify(data.message, 'success');
          navigate('/');
        }
      } catch (error) {
        console.log('Registration error:', error);
        // Handle registration error
        // end loading
        setLoading(false);
        notify(error.response.data.message, 'error');
      }
    }
  });
  // console.log(regData.errors);

  return (
    <>
      <div className="w-50 m-auto bg-body p-2 mt-4 border-2 shadow-lg">
      <div className="m-auto m-5 p-5">
        <h1>Login <span className='title-h2'>Form</span></h1>
        <h3 className='text-muted'><span className='title-h2'>Keep</span> in touch</h3>
      <hr />
        <form className="row g-3" onSubmit={regData.handleSubmit}>

    <div className="col-md-12">
    <input type="email" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.email} className="form-control" placeholder='Email'   name='email'/>
    {regData.errors.email && regData.touched.email ? <div className="text-danger">{regData.errors.email}</div> : null}
    </div>

    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.password} className="form-control" placeholder='password' name='password'/>
    {regData.errors.password && regData.touched.password ? <div className="text-danger">{regData.errors.password}</div> : null}
    </div>

  <div className="col-12">
    <button className="btn bg-main text-white" type="submit" disabled={!(regData.isValid && regData.dirty && !loading)}>
      {!loading ? 'Login' : <i className='fas fa-spinner fa-spin'></i>}
    </button>
  </div>
</form>

      </div>
      </div>
    </>

  )
}
