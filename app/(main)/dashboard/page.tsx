'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/userdata');
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user:any) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}, <strong>Address:</strong> {user.address}, <strong>Work:</strong> {user.work}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
