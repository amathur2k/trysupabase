const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or key not found in environment variables');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize OpenAI client for generating embeddings
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error('OpenAI API key not found in environment variables');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

// Function to generate embeddings for a text
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Function to store a document with its embedding in Supabase
async function storeDocument(heading, content) {
  try {
    // Generate embedding for the content
    const embedding = await generateEmbedding(content);
    
    // Store document and embedding in Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert([
        { 
          heading, 
          content, 
          embedding 
        }
      ]);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error storing document:', error);
    throw error;
  }
}

// Function to search for similar documents
async function searchDocuments(query) {
  try {
    // Generate embedding for the query
    const embedding = await generateEmbedding(query);
    
    // Search for similar documents using vector similarity
    const { data, error } = await supabase
      .rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.5, // Adjust as needed
        match_count: 5 // Return top 5 matches
      });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
}

module.exports = {
  storeDocument,
  searchDocuments
};
