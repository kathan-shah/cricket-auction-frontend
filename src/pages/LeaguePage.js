import React, { useState, useEffect } from 'react';
import { getLeagues, addTeamToLeague } from '../services/apiService';
import { Container, Typography, Card, CardContent, CardActions, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LeaguePage = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const fetchedLeagues = await getLeagues();
        setLeagues(fetchedLeagues);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };
    fetchLeagues();
  }, []);

  const handleJoinLeague = async (leagueID) => {
    try {
      await addTeamToLeague(teamName, 'user123', leagueID);  // Replace 'user123' with actual user identification
      console.log('Team added to league');
      navigate('/dashboard'); // Navigate to dashboard after joining a league
    } catch (error) {
      console.error('Error adding team to league:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Leagues
        </Typography>
        {leagues.map((league) => (
          <Card key={league.LeagueID} variant="outlined" style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h5">{league.LeagueName}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setSelectedLeague(league.LeagueID)}
              >
                Join
              </Button>
            </CardActions>
          </Card>
        ))}
        {selectedLeague && (
          <Box mt={4}>
            <Typography variant="h5">Join League: {selectedLeague}</Typography>
            <TextField
              label="Team Name"
              variant="outlined"
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleJoinLeague(selectedLeague)}
            >
              Join League
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LeaguePage;