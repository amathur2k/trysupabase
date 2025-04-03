const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const documentRoutes = require('./routes/documentRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
const publicPath = path.join(__dirname, '../public');
console.log('Serving static files from:', publicPath);
app.use('/', express.static(publicPath));

// Routes
app.use('/api', documentRoutes);

// Serve the main HTML page
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath, { root: path.join(__dirname, '../') });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
