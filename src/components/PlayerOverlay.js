// src/components/PlayerOverlay.js
import React from 'react';
import PlayerCard from './PlayerCard';
import { FormControlLabel, Checkbox } from '@mui/material';

const PlayerOverlay = ({ players, editMode, handleCheckboxChange, teamChanges }) => {
  const {
    wicketkeepers = [],
    batters = [],
    allRounders = [],
    bowlers = [],
    bench = []
  } = players;

  const calculateCentralPosition = (totalPlayers, index) => {
    // Calculate the central position for players to be evenly spaced
    return 47 - ((totalPlayers - 1) * 10 / 2) + (index * 10);
  };

  return (
    <>
      {/* Arrange Wicketkeeper */}
      {wicketkeepers.map((player, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '10%',
            left: `${calculateCentralPosition(wicketkeepers.length, index)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayerCard player={player} />
          {editMode && (
            <FormControlLabel
              control={<Checkbox checked={teamChanges[player.player_id] ?? false} onChange={() => handleCheckboxChange(player.player_id)} />}
              label="Starter"
            />
          )}
        </div>
      ))}
      {/* Arrange Batters */}
      {batters.map((player, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '25%',
            left: `${calculateCentralPosition(batters.length, index)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayerCard player={player} />
          {editMode && (
            <FormControlLabel
              control={<Checkbox checked={teamChanges[player.player_id] ?? false} onChange={() => handleCheckboxChange(player.player_id)} />}
              label="Starter"
            />
          )}
        </div>
      ))}
      {/* Arrange All-Rounders */}
      {allRounders.map((player, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${calculateCentralPosition(allRounders.length, index)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayerCard player={player} />
          {editMode && (
            <FormControlLabel
              control={<Checkbox checked={teamChanges[player.player_id] ?? false} onChange={() => handleCheckboxChange(player.player_id)} />}
              label="Starter"
            />
          )}
        </div>
      ))}
      {/* Arrange Bowlers */}
      {bowlers.map((player, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '70%',
            left: `${calculateCentralPosition(bowlers.length, index)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayerCard player={player} />
          {editMode && (
            <FormControlLabel
              control={<Checkbox checked={teamChanges[player.player_id] ?? false} onChange={() => handleCheckboxChange(player.player_id)} />}
              label="Starter"
            />
          )}
        </div>
      ))}
      {/* Bench Players */}
      {bench.map((player, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: `${calculateCentralPosition(bench.length, index)}%`,
            transform: 'translate(-50%, 0)',
          }}
        >
          <PlayerCard player={player} />
          {editMode && (
            <FormControlLabel
              control={<Checkbox checked={teamChanges[player.player_id] ?? false} onChange={() => handleCheckboxChange(player.player_id)} />}
              label="Starter"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default PlayerOverlay;
