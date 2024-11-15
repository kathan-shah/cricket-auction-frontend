import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid2, Card, CardContent, CardMedia, CircularProgress, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getTeamInfo, saveTeamInfo } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [teamChanges, setTeamChanges] = useState({});
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

  const handleEditClick = () => {
    setEditMode(true);
    setTeamChanges(userTeam.players.reduce((acc, player) => {
      acc[player.PlayerID] = player.IsStarter;
      return acc;
    }, {}));
  };

  const handleCheckboxChange = (playerId) => {
    setTeamChanges((prevChanges) => ({
      ...prevChanges,
      [playerId]: !prevChanges[playerId]
    }));
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      console.log(teamChanges);
      await saveTeamInfo(currentUser.email, teamChanges);
      // Refresh the team info after saving
      const updatedTeam = await getTeamInfo(currentUser.email);
      setUserTeam(updatedTeam);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving team info:', error);
    } finally {
      setLoading(false);
    }
  };

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
                Starting Players
              </Typography>
              {userTeam && userTeam.players.filter(player => player.IsStarter).map((player, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    alt={player.PlayerName}
                    image={`../assets/${player.Team}-logo.png`}
                    title={player.PlayerName}
                    style={{ width: 50, height: 50, marginRight: '1rem' }}
                  />
                  <Typography variant="body1" style={{ flex: 1 }}>
                    {player.PlayerName} - {player.Role}
                  </Typography>
                  {editMode && (
                    <FormControlLabel
                      control={<Checkbox checked={teamChanges[player.PlayerID]} onChange={() => handleCheckboxChange(player.PlayerID)} />}
                      label="Starter"
                    />
                  )}
                </Box>
              ))}
              <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
                Bench Players
              </Typography>
              {userTeam && userTeam.players.filter(player => !player.IsStarter).map((player, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    alt={player.PlayerName}
                    image={`/assets/images/${player.Team.toLowerCase()}.png`}
                    title={player.PlayerName}
                    style={{ width: 50, height: 50, marginRight: '1rem' }}
                  />
                  <Typography variant="body1" style={{ flex: 1 }}>
                    {player.PlayerName} - {player.Role}
                  </Typography>
                  {editMode && (
                    <FormControlLabel
                      control={<Checkbox checked={teamChanges[player.PlayerID]} onChange={() => handleCheckboxChange(player.PlayerID)} />}
                      label="Starter"
                    />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      <Box mt={4} textAlign="center">
        {!editMode ? (
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit Team
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save Team
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={handleMatchdayClick} style={{ marginLeft: '1rem' }}>
          Go to Matchday
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;