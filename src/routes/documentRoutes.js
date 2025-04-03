const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Route for document ingestion
router.post('/documents', documentController.ingestDocument);

// Route for document search
router.get('/search', documentController.searchDocuments);

module.exports = router;
