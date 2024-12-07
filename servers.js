// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory "database" (replace with a real DB in production)
const users = [
  {
    email: 'user@example.com',
    password: '$2a$10$Lg8Z1FGHq6vwA9C0kLSBGe/KvRVYSoB0bTr2ACFLx2fEpbvqQoy3m' // Hash of 'password123'
  }
];

// POST: /signin route to authenticate users
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in our "database"
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to protect dashboard route
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// GET: /dashboard route, only accessible if authenticated
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
