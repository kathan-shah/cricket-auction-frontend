import React, { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // New package for Google Login
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Correct way to import
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (credentialResponse) => {
    setIsLoading(false);
    console.log('Login Success:', credentialResponse);
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    login(user);
    navigate('/dashboard');  // Redirect to dashboard after login
  };

  const onFailure = (error) => {
    setIsLoading(false);
    console.error('Login Failed:', error);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '4rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box mt={4}>
          <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
