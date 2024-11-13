import React, { useState } from 'react';
import { createLeague } from '../services/apiService';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateLeaguePage = () => {
  const [leagueName, setLeagueName] = useState('');
  const navigate = useNavigate();

  const handleCreateLeague = async () => {
    try {
      const response = await createLeague(leagueName, 'user123');  // Replace 'user123' with actual user identification
      console.log('League created:', response);
      navigate('/leagues');  // Navigate to leagues page after creating a league
    } catch (error) {
      console.error('Error creating league:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Create a League
        </Typography>
        <TextField
          label="League Name"
          variant="outlined"
          fullWidth
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateLeague}>
          Create League
        </Button>
      </Box>
    </Container>
  );
};

export default CreateLeaguePage;