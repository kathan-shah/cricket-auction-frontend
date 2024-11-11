const API_URL = process.env.REACT_APP_API_URL;

export const getTestMessage = async () => {
  try {
    const response = await fetch(`${API_URL}/test`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was an error fetching the test message:', error);
  }
};

export const createLeague = async (leagueName, createdBy) => {
    try {
      const response = await fetch(`${API_URL}/league`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leagueName, createdBy })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating league:', error);
    }
  };

export const addTeamToLeague = async (teamName, userID, leagueID) => {
    try {
        const response = await fetch(`${API_URL}/team`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, userID, leagueID })
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding team to league:', error);
    }
};