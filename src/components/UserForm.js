import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, editUser, currentUser, setCurrentUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (currentUser) {
      editUser(user);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '' });
    setCurrentUser(null);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        required
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {currentUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;