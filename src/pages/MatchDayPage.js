// src/pages/MatchdayPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid2, Card, CardContent, CircularProgress } from '@mui/material';
import { getMatchdayInfo } from '../services/apiService';

const MatchdayPage = () => {
  const [matchdayInfo, setMatchdayInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchdayInfo = async () => {
      try {
        setLoading(true);
        const matchdayData = await getMatchdayInfo(1); // Change from hard-code to fetching user's league id
        setMatchdayInfo(matchdayData);
      } catch (error) {
        console.error('Error fetching matchday info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchdayInfo();
  }, []);

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
        Matchday Head-to-Head
      </Typography>
      <Grid2 container spacing={4}>
        {matchdayInfo && matchdayInfo.matches.map((match, index) => (
          <Grid2 item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {match.UserA} vs {match.UserB}
                </Typography>
                <Typography variant="body2">
                  Match Date: {match.MatchDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {match.MatchWinner === 'Pending'
                    ? 'Result: Pending'
                    : `Winner: ${match.MatchWinner}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default MatchdayPage;
