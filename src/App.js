// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateLeaguePage from './pages/CreateLeaguePage';
import LeaguePage from './pages/LeaguePage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MatchdayPage from './pages/MatchDayPage';

// Set up Google OAuth Provider with client ID
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-league" element={<CreateLeaguePage />} />
            <Route path="/leagues" element={<LeaguePage />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/matchday" element={<MatchdayPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
