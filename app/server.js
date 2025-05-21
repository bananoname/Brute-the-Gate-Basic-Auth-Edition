const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const auth = {
  username: "gamer",
  password: "lugx@123"
};

// Public site
app.use(express.static(path.join(__dirname, 'public')));

// Protected admin area
app.use('/admin', (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1] || '';
  const [user, pass] = Buffer.from(token, 'base64').toString().split(':');

  if (user === auth.username && pass === auth.password) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
  res.status(401).send('Authentication required.');
});

// Admin dashboard
app.get('/admin', (req, res) => {
  res.send(`
    <h2>Welcome to the Admin Panel</h2>
    <p>Your flag is: <code>FLAG{brute_force_success}</code></p>
  `);
});

app.listen(port, () => {
  console.log(`Lugx Gaming Lab running at http://localhost:${port}`);
});
