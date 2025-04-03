const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log('Request received for:', req.url);
  
  if (req.url === '/' || req.url === '/index.html') {
    // Serve the index.html file
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading index.html: ${err.message}`);
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/test') {
    // Simple test endpoint
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Test endpoint works!');
  } else {
    // Try to serve static files from public directory
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end(`File not found: ${req.url}`);
        return;
      }
      
      // Determine content type
      let contentType = 'text/html';
      const ext = path.extname(filePath);
      if (ext === '.js') contentType = 'text/javascript';
      if (ext === '.css') contentType = 'text/css';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Simple HTTP server running at http://localhost:${PORT}`);
});
