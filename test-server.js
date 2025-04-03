const express = require('express');
const app = express();
const port = 3001; // Using a different port

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World! This is a test server.');
});

// Start the server
app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
