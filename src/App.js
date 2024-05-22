import React, { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user) => {
    setCurrentUser(user);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        addUser={addUser}
        editUser={updateUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
};

export default App;