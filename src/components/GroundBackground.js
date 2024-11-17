// src/components/GroundBackground.js
import React from 'react';
import { Box } from '@mui/material';

const GroundBackground = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '80vh', // Make it relative to the viewport height to maintain responsiveness
        backgroundImage: 'url("/assets/images/cricket_ground.png")',
        backgroundSize: 'contain', // Ensures the whole ground is shown
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden', // Ensures players don't overflow outside the field
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default GroundBackground;
