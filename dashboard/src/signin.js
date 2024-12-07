async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    const response = await fetch('http://localhost:5173/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}
