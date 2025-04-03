# Supabase Vector Search App

A simple application that uses Supabase as a Vector Database for document ingestion and semantic search.

## Features

- Document ingestion with heading and content
- Vector embeddings generation using OpenAI
- Semantic search across documents
- Display of relevant results with similarity scores

## Prerequisites

- Node.js (v14 or higher)
- Supabase account with pgvector extension enabled
- OpenAI API key

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```

4. **Set up Supabase database**
   - Log in to your Supabase dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `supabase-schema.sql` to create the necessary tables and functions

5. **Start the application**
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Usage

### Ingesting Documents
1. Enter a document heading and content in the left panel
2. Click "Ingest Document"
3. Wait for confirmation

### Searching Documents
1. Enter a search query in the right panel
2. Click "Search"
3. View the results sorted by relevance

## How It Works

1. **Document Ingestion**:
   - Document content is converted to vector embeddings using OpenAI's text-embedding-ada-002 model
   - The document heading, content, and embedding are stored in Supabase

2. **Document Search**:
   - Search query is converted to a vector embedding
   - Supabase performs a similarity search using the pgvector extension
   - Results are returned based on vector similarity

## License

ISC
