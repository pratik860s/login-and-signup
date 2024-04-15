document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission
  
  // Get the username, email, and password from the form
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  // Perform form validation
  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // Send the signup request to the server
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  if (response.ok) {
    alert('Signup successful');
    window.location.href = '/login.html'
  } else {
    alert('Signup failed');
  }
});
