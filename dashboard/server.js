const express = require('express');
const path = require('path');

const app = express();
const port = 5173;

// Serve static files
app.use(express.static('src'));

// Routing for Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index1.html'));
});

// Routing for About Page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'dashboard.html'));
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
