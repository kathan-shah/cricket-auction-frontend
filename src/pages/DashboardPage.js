// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid2, Card, CardContent, CardMedia, CircularProgress, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getTeamInfo } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const userTeamData = await getTeamInfo(currentUser.email);
        setUserTeam(userTeamData);
      } catch (error) {
        console.error('Error fetching team info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [currentUser]);

  const handleMatchdayClick = () => {
    navigate('/matchday');
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Team
      </Typography>
      <Grid2 container spacing={4}>
        {/* User's Team */}
        <Grid2 item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Team Players
              </Typography>
              {userTeam && userTeam.players.map((player, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    alt={player.PlayerName}
                    image={require(`../assets/${player.Team}-logo.png`)}
                    title={player.PlayerName}
                    style={{ width: 50, height: 50, marginRight: '1rem' }}
                  />
                  <Typography variant="body1">
                    {player.PlayerName} - {player.Role}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleMatchdayClick}>
          Go to Matchday
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
