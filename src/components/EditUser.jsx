import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EditUser = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', city: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/${id}`);
        const user = response.data;
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/${id}`, { name, username, email, phone, address });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={updateUser}>
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
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
