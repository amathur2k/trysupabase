const supabaseService = require('../services/supabaseService');

// Controller to handle document ingestion
exports.ingestDocument = async (req, res) => {
  try {
    const { heading, content } = req.body;
    
    // Validate input
    if (!heading || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Heading and content are required' 
      });
    }
    
    // Store document in Supabase
    await supabaseService.storeDocument(heading, content);
    
    return res.status(201).json({ 
      success: true, 
      message: 'Document ingested successfully' 
    });
  } catch (error) {
    console.error('Error in ingestDocument controller:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error ingesting document', 
      error: error.message 
    });
  }
};

// Controller to handle document search
exports.searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;
    
    // Validate input
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }
    
    // Search for documents in Supabase
    const results = await supabaseService.searchDocuments(query);
    
    return res.status(200).json({ 
      success: true, 
      results 
    });
  } catch (error) {
    console.error('Error in searchDocuments controller:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error searching documents', 
      error: error.message 
    });
  }
};
