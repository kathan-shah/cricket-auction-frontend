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

export const getLeagues = async () => {
    try {
      const response = await fetch(`${API_URL}/get-leagues`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

export const getTeamInfo = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/team/email/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There was an error fetching the team info:', error);
    }
};

export const saveTeamInfo = async (email, teamChanges) => {
    try {
      const response = await fetch(`${API_URL}/team/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          teamChanges,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving team info:', error);
      throw error;
    }
  };

export const getMatchdayInfo = async (leagueId) => {
    try {
      const response = await fetch(`${API_URL}/matchday/leagueId/${leagueId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching matchday info:', error);
      throw error;
    }
};