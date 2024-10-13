import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';
import { toast } from 'react-toastify';

export default function ContactForm() {
  // Toastify notification
  const notify = (message, type) => toast[type](`${message}`);

  // Form data
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(false); // Track the loading state

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error as the user types
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { phone, email, message } = formData;

    // Simple email validation regex
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // Simple phone validation (for 10-15 digits)
    const phonePattern = /^[0-9]{10,15}$/;

    // Validation logic
    let formValid = true;
    const newErrors = { phone: '', email: '' };

    if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      formValid = false;
    }

    if (!phonePattern.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number with 10-15 digits';
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      setLoading(true); // Start loading

      // Send data to the backend via Axios
      axios
        .post('http://localhost:5000/user/contact', formData)
        .then((data) => {
          notify(data.data.message, 'info');
          setFormData({ phone: '', email: '', message: '' }); // Clear the form after success
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          notify('Failed to send message, please try again later.', 'error');
          setLoading(false); // Stop loading on error
        });
    }
  }

  return (
    <>
      <div className="my-5 chat py-3">
        <div className="container my-5 contact-section">
          <h1 className="text-center mb-4">Contact Us</h1>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                  {errors?.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                  {loading ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
