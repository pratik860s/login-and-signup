document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:3000/account', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const accountDataDiv = document.getElementById('accountData');
        accountDataDiv.innerHTML = `
          <p>Username: ${data.username}</p>
          <p>Email: ${data.email}</p>
        `;
      } else {
        console.error('Failed to fetch account data');
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  });
  