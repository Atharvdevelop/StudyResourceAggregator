const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// IMPORTANT: Render uses a dynamic port. process.env.PORT is required for deployment.
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for resources
let resources = [
  { id: 1, title: 'Introduction to Algebra', description: 'Basic algebra concepts.', url: 'https://example.com/algebra', category: 'Math' },
  { id: 2, title: 'JavaScript Basics', description: 'Learn JS fundamentals.', url: 'https://example.com/js', category: 'Programming' },
];

// Route to serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API route to get all resources
app.get('/api/resources', (req, res) => {
  res.json(resources);
});

// Route to handle adding a new resource via POST
app.post('/add-resource', (req, res) => {
  const { title, description, url, category } = req.body;
  if (title && description && url && category) {
    const newResource = {
      id: resources.length + 1,
      title,
      description,
      url,
      category
    };
    resources.push(newResource);
    res.redirect('/'); 
  } else {
    res.status(400).send('All fields are required.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});