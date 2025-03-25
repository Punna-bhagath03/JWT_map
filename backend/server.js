const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Updated with your new hash
const users = [
  {
    email: 'test@example.com',
    password: '$2b$10$8wNJE/ICywaSYDJ9KlUyBecgTsP8UdA1agpy.sVDDYKttR66uTIOu',
  },
];

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received:', { email, password });
  const user = users.find((u) => u.email === email);
  console.log('Found user:', user);
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('Password match:', passwordMatch); // Debug line
  if (!user || !passwordMatch) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
}

app.get('/dashboard', authenticate, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});

app.get('/mapview', authenticate, (req, res) => {
  res.json({ message: 'Welcome to the map view!' });
});

app.listen(5002, () => console.log('Server running on port 5002'));
