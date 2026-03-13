const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Kids Learning App - Home' });
});

app.get('/alphabet', (req, res) => {
  res.render('alphabet', { title: 'Learn the Alphabet' });
});

app.get('/numbers', (req, res) => {
  res.render('numbers', { title: 'Learn Numbers' });
});

app.get('/colors', (req, res) => {
  res.render('colors', { title: 'Learn Colors' });
});

app.get('/shapes', (req, res) => {
  res.render('shapes', { title: 'Learn Shapes' });
});

app.get('/animals', (req, res) => {
  res.render('animals', { title: 'Learn Animals' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});