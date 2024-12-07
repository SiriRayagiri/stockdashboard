const token = localStorage.getItem('token');

if (token) {
    const response = await fetch('http://localhost:5173/dashboard', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        // Show dashboard data
        document.getElementById('dashboard').innerText = data.message;
    } else {
        alert(data.message); // Invalid token or session expired
        window.location.href = 'index1.html'; // Redirect to sign-in page
    }
} else {
    window.location.href = 'index1.html'; // No token, redirect to sign-in
}
