import React, { useState } from 'react';
import { createLeague } from '../services/apiService';

const CreateLeaguePage = () => {
  const [leagueName, setLeagueName] = useState('');

  const handleCreateLeague = async () => {
    try {
      const response = await createLeague(leagueName, 'user123');  // Replace 'user123' with actual user identification
      console.log('League created:', response);
    } catch (error) {
      console.error('Error creating league:', error);
    }
  };

  return (
    <div>
      <h2>Create a League</h2>
      <input
        type="text"
        placeholder="League Name"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
      />
      <button onClick={handleCreateLeague}>Create League</button>
    </div>
  );
};

export default CreateLeaguePage;