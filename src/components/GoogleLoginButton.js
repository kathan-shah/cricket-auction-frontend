import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;