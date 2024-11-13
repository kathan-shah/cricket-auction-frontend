// src/pages/HomePage.js
import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, CardMedia, AppBar, Toolbar, IconButton, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Placeholder for an icon
import welcomeImg from '../assets/teamCap.png'; // Placeholder welcome image
import { styled } from '@mui/system';

const WelcomeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${welcomeImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  textAlign: 'center',
}));

const HomePage = () => {
  const navigate = useNavigate();
//TODO: Add logic to join and create if already logged in
  const handleJoinNowClick = () => {
    navigate('/login');
  };

  const handleCreateLeagueClick = () => {
    navigate('/create-league');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Banner Section */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fantasy IPL Auction
          </Typography>
          <Tabs textColor="inherit" indicatorColor="secondary">
            <Tab label="Fixtures" />
            <Tab label="Points Table" />
            <Tab label="Teams" />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Welcome Section with Overlayed Text and Buttons */}
      <WelcomeContainer>
        <Typography variant="h2" gutterTop>
          Welcome to Fantasy Cricket Auction
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          Join or create leagues, manage your team, and experience the thrill of Fantasy Cricket Auction.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleJoinNowClick}
            style={{ marginRight: '1rem' }}
          >
            Join League
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLoginClick}
            style={{ marginRight: '1rem' }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleCreateLeagueClick}
          >
            Create League
          </Button>
        </Box>
      </WelcomeContainer>

      
    </>
  );
};

export default HomePage;
