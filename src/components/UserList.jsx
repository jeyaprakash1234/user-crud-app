import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/add-user" className="btn btn-primary mb-3">Add User</Link>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
            <Link to={`/edit-user/${user.id}`} className="btn btn-warning btn-sm mx-2">Edit</Link>
            <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
