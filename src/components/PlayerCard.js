// src/components/PlayerCard.js
import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';

const PlayerCard = ({ player }) => {
  return (
    <Box
      sx={{
        width: '80px',
        textAlign: 'center',
        position: 'absolute',
      }}
    >
      <CardMedia
        component="img"
        image={`/assets/images/${player.Team}-logo.png`}
        alt={player.PlayerName}
        sx={{
          width: '50px',
          height: '50px',
          margin: '0 auto',
        }}
      />
      <Typography variant="caption">{player.PlayerName}</Typography>
    </Box>
  );
};

export default PlayerCard;
