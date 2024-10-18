import React , { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function ChangePassword() {
  // tostify
  // const notify = (message, type) => toast[type](`${message}`);

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
      if (values.oldpassword === '') {
        errors.oldpassword = '*old password is required';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.oldpassword)) {
        errors.oldpassword = '*old password format is wrong';
      }
      if (values.newpassword === '') {
        errors.newpassword = '*new password is required';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.newpassword)) {
        errors.newpassword = '*new password must be at least 8 char , 1 letter and 1 number';
      }
      if (values.cpassword === '') {
        errors.cpassword = 'confirm password is required';
      } else if (values.newpassword !== values.cpassword) { 
        errors.cpassword = 'confirm password not match';
      }
      return errors;
    } 
  // get data from form
  let regData = useFormik({
    initialValues: {
      email: '',
      oldpassword: '',
      newpassword: '',
      cpassword: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const userData = {
          email: values.email,
          oldpassword: values.oldpassword,
          newpassword: values.newpassword,
        };
        console.log(userData);
        // start loading
        setLoading(true);
        const {data} = await axios.put('http://localhost:5000/auth/changePassword', userData);
        console.log(data);
        // end loading
         setLoading(false);
        if (data.message === 'wrong email or password') {
          toast('wrong email or password', 'danger');
        }

        if (data.message === 'changed Successfuly') {
          toast('changed Successfuly', 'success');
          navigate('/login');
        }

        
      } catch (error) {
        console.log('change Password error:', error);
        // end loading
        setLoading(false);
        toast(`${error.response.message}`, 'danger')
      }
    }
  });

  return (
    <>
      <div className="w-50 m-auto bg-body p-2 mt-4 border-2 shadow-lg">
      <div className="m-auto m-5 p-5">
        <h1>Change <span className='title-h2'>Password</span></h1>
      <hr />
        <form className="row g-3" onSubmit={regData.handleSubmit}>

    <div className="col-md-12">
    <input type="email" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.email} className="form-control" placeholder='Email'   name='email'/>
    {regData.errors.email && regData.touched.email ? <div className="text-danger">{regData.errors.email}</div> : null}
    </div>

    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.oldpassword} className="form-control" placeholder='password' name='oldpassword'/>
    {regData.errors.oldpassword && regData.touched.oldpassword ? <div className="text-danger">{regData.errors.oldpassword}</div> : null}
    </div>

    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.newpassword} className="form-control" placeholder='new password' name='newpassword'/>
    {regData.errors.newpassword && regData.touched.newpassword ? <div className="text-danger">{regData.errors.newpassword}</div> : null}
    </div>

    <div className="col-md-12">
    <input type="password" onBlur={regData.handleBlur} onChange={regData.handleChange} value={regData.values.cpassword} className="form-control" placeholder='confirm password' name='cpassword'/>
    {regData.errors.cpassword && regData.touched.cpassword ? <div className="text-danger">{regData.errors.cpassword}</div> : null}
    </div>

  <div className="col-12">
    <button className="btn bg-main text-white" type="submit" disabled={!(regData.isValid && regData.dirty && !loading)}>
      {!loading ? 'Change password' : <i className='fas fa-spinner fa-spin'></i>}
    </button>
    <Link className="nav-link text-primary my-2" to="/login">back to login page</Link>

  </div>
</form>

      </div>
      </div>
    </>

  )
}
