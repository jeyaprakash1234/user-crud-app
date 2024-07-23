import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddUser = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', city: '' });
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/', { name, username, email, phone, address });
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={addUser}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddUser;
