document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission
  
  // Get the email and password from the form
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');

  // Perform form validation
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }
  
  // Send the login request to the server
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    alert('Login successful');
    window.location.href = '/account.html'; 
  } else {
    alert('Login failed');
  }
});
