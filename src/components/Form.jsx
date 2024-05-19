import React, { useState } from 'react';
import Card from './Card';

function Form({ handleSubmitt, contactData }) {
  const [formData, setFormData] = useState({
      name: '',
      lastname: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name} is required`;
    } else {
      if (name === 'email') {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(value)) {
          error = 'Invalid email address';
        }
      }
    }
    return error;
  };

  const validateForm = () => {
    const fieldNames = Object.keys(formData);
    let newErrors = {};
    let isValid = true;

    fieldNames.forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmitt(e, formData);
      setFormData({
          name: '',
          lastname: '',
        email: ''
      });
      setErrors({});
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label>
         FIRST NAME:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
              </label>
              

              <label>
          LAST NAME:
          <input type="text" name="lastname" value={formData.name} onChange={handleChange} />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </label>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        
        <button type="submit">Submit</button>
      </form>
      <Card contactData={contactData} />
    </>
  );
}

export default Form;
