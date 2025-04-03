const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/', function(req, res) {
  console.log('Root route accessed');
  res.send('Hello World!');
});

// Test route
app.get('/test', function(req, res) {
  console.log('Test route accessed');
  res.send('Test route works!');
});

// Error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, function() {
  console.log(`Minimal server running at http://localhost:${port}`);
});
