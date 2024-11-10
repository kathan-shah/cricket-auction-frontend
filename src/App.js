// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Set up Google OAuth Provider with client ID
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
