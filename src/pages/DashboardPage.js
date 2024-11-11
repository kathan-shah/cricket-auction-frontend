import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTestMessage } from '../services/apiService';

const DashboardPage = () => {
  const { setUser } = useContext(AuthContext);  // Access setUser from AuthContext
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await getTestMessage();
      if (response) {
        setMessage(response.message);
      }
    };
    fetchMessage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);  // Update user state to null
    window.location.href = '/login';  // Redirect to login page after logout
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>Welcome, {user.name}</p>
          <img src={user.picture} alt="Profile" />
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;