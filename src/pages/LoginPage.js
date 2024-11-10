// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // New package for Google Login
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Correct way to import as a named export
import { useHistory } from 'react-router-dom';



const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (credentialResponse) => {
    setIsLoading(false);
    console.log('Login Success:', credentialResponse);
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    history.push('/dashboard');  // Redirect to dashboard after login
  };

  const onFailure = (error) => {
    setIsLoading(false);
    console.error('Login Failed:', error);
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoading ? (
      <p>Loading...</p>
    ) : (
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
    )}
    </div>
  );
};

export default LoginPage;
