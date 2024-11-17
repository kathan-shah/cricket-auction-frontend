// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Container, Box, Button, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getTeamInfo, saveTeamInfo } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import GroundBackground from '../components/GroundBackground';
import PlayerOverlay from '../components/PlayerOverlay';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [teamChanges, setTeamChanges] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
  }, [currentUser]);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const userTeamData = await getTeamInfo(currentUser.email);

      // Categorize players based on roles
      const categorizedPlayers = {
        wicketkeepers: [],
        batters: [],
        allRounders: [],
        bowlers: [],
        bench: []
      };

      userTeamData.players.forEach((player) => {
        if (player.IsStarter) {
          if (player.Role === 'Wicketkeeper') {
            categorizedPlayers.wicketkeepers.push(player);
          } else if (player.Role === 'Batsman') {
            categorizedPlayers.batters.push(player);
          } else if (player.Role === 'All-Rounder') {
            categorizedPlayers.allRounders.push(player);
          } else if (player.Role === 'Bowler') {
            categorizedPlayers.bowlers.push(player);
          }
        } else {
          categorizedPlayers.bench.push(player);
        }
      });

      setUserTeam(categorizedPlayers);
      setTeamChanges(
        userTeamData.players.reduce((acc, player) => {
          acc[player.PlayerID] = player.IsStarter;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error fetching team info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCheckboxChange = (playerId) => {
    setTeamChanges((prevChanges) => ({
      ...prevChanges,
      [playerId]: !prevChanges[playerId]
    }));
  };

  const handleSaveClick = async () => {
    try {
      setLoadingSave(true);
      await saveTeamInfo(currentUser.email, teamChanges);
      setEditMode(false);
      await fetchTeam(); // Fetch updated team data to make sure changes reflect correctly
    } catch (error) {
      console.error('Error saving team info:', error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleMatchdayClick = () => {
    navigate('/matchday');
  };

  if (loading || loadingSave) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      {userTeam && (
        <GroundBackground>
          {/* Display players on the field */}
          <PlayerOverlay players={userTeam} editMode={editMode} handleCheckboxChange={handleCheckboxChange} teamChanges={teamChanges} />
        </GroundBackground>
      )}
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
