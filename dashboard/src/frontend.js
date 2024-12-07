// Sign-in form submission (JavaScript)
const handleSubmit = async (event) => {
    event.preventDefault();
  
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    const response = await fetch('http://localhost:5173/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Store the JWT token in local storage (or cookies)
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // Redirect to the dashboard
    } else {
      console.error(data.message); // Show error to user
    }
  };
  