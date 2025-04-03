# Supabase Vector Search App

A streamlined application that uses Supabase as a Vector Database for article ingestion and semantic search. This project focuses on the backend functionality for processing and storing articles with vector embeddings.

## Features

- Article ingestion with heading and content
- Vector embeddings generation using OpenAI's text-embedding-ada-002 model
- Storage of articles and embeddings in Supabase Vector Database
- API endpoints for document management and search

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

6. **Access the API**
   The API will be available at `http://localhost:3000/api`

## Usage

### Ingesting Articles
You can use the `insert-articles.js` script to ingest sample climate change articles:

```
node insert-articles.js
```

This script will process predefined articles and insert them into your Supabase database with vector embeddings.

### Using the API
- `POST /api/documents` - Ingest a new document
- `GET /api/documents/search?query=your_query` - Search for documents by semantic similarity

## Project Structure

```
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore file
├── README.md           # This file
├── check-env.js        # Utility to check environment variables
├── insert-articles.js  # Script to insert sample articles
├── package.json        # Project dependencies
├── src/                # Source code
│   ├── controllers/    # API controllers
│   ├── routes/         # API routes
│   ├── services/       # Supabase and OpenAI services
│   └── index.js        # Main server file
└── supabase-schema.sql # Database schema for Supabase
```

## How It Works

1. **Article Ingestion**:
   - Article content is converted to vector embeddings using OpenAI's text-embedding-ada-002 model
   - The article heading, content, and embedding are stored in Supabase

2. **Vector Search**:
   - Search queries are converted to vector embeddings
   - Supabase performs a similarity search using the pgvector extension
   - Results are returned based on vector similarity

## License

ISC
