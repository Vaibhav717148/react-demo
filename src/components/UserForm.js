import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ addUser, editUser, currentUser, setCurrentUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let nameError = '';
    let emailError = '';

    if (!user.name) {
      nameError = 'Name is required';
    }

    if (!user.email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      emailError = 'Email is invalid';
    }

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validate()) {
      if (currentUser) {
        editUser(user);
      } else {
        addUser(user);
      }

      // Send email
      axios.post('http://localhost:5000/send-email', user)
        .then(response => {
          console.log('Email sent successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error sending the email:', error);
        });

      setUser({ name: '', email: '' });
      setCurrentUser(null);
      setErrors({ name: '', email: '' });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <button type="submit">
        {currentUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
