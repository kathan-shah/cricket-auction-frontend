import React, { useState, useEffect } from 'react';
import { addTeamToLeague } from '../services/apiService';

const LeaguePage = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-leagues`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeagues(data);
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
    } catch (error) {
      console.error('Error adding team to league:', error);
    }
  };

  return (
    <div>
      <h2>Leagues</h2>
      <ul>
        {leagues.map((league) => (
          <li key={league.LeagueID}>
            {league.LeagueName}
            <button onClick={() => setSelectedLeague(league.LeagueID)}>Join</button>
          </li>
        ))}
      </ul>
      {selectedLeague && (
        <div>
          <h3>Join League: {selectedLeague}</h3>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button onClick={() => handleJoinLeague(selectedLeague)}>Join League</button>
        </div>
      )}
    </div>
  );
};

export default LeaguePage;
