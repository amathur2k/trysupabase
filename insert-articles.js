require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Articles to insert
const articles = [
  {
    heading: "The Melting Ice and Rising Seas",
    content: "Glaciers and ice sheets in Greenland and Antarctica are melting at an alarming rate, significantly contributing to rising sea levels. Coastal cities such as Miami, Jakarta, and Dhaka are already experiencing frequent flooding, displacing communities and damaging infrastructure. If emissions continue unchecked, sea levels could rise by over a meter by 2100, submerging entire islands and low-lying regions. Investing in climate resilience and reducing carbon footprints are crucial to mitigating these threats."
  },
  {
    heading: "Extreme Weather: The New Normal",
    content: "Climate change is intensifying hurricanes, wildfires, and droughts worldwide, making extreme weather events more severe and unpredictable. Warmer ocean temperatures fuel stronger storms, while prolonged droughts and heatwaves devastate agriculture and water supplies. Countries like Australia, the U.S., and India have seen record-breaking wildfires, destroying millions of hectares of land. Governments must prioritize climate adaptation strategies to protect vulnerable communities and reduce the impact of these disasters."
  },
  {
    heading: "Deforestation and Carbon Emissions",
    content: "Forests play a crucial role in absorbing carbon dioxide, yet deforestation continues at an alarming pace. The Amazon rainforest, often called the \"lungs of the Earth,\" is being destroyed for agriculture, logging, and urban expansion, releasing vast amounts of CO₂ into the atmosphere. Reforestation, sustainable land management, and policies that protect natural habitats are essential in fighting climate change. Without urgent intervention, the loss of forests will accelerate global warming and biodiversity loss."
  },
  {
    heading: "A Path to a Greener Future",
    content: "Despite the challenges, there is hope for a sustainable future through innovation and policy changes. Renewable energy sources such as solar, wind, and hydroelectric power are becoming more accessible, reducing our reliance on fossil fuels. Governments and corporations are setting ambitious carbon neutrality goals, while individuals can contribute by adopting eco-friendly habits. The fight against climate change requires collective action, and every step toward sustainability makes a difference."
  }
];

// Function to generate embedding for text
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to insert article with embedding into Supabase
async function insertArticle(article, embedding) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert({
        heading: article.heading,
        content: article.content,
        embedding: embedding
      });
    
    if (error) throw error;
    console.log(`Successfully inserted article: "${article.heading}"`);
    return data;
  } catch (error) {
    console.error('Error inserting article:', error);
    throw error;
  }
}

// Main function to process all articles
async function processArticles() {
  console.log('Starting to process articles...');
  
  for (const article of articles) {
    try {
      console.log(`Processing article: "${article.heading}"`);
      
      // Generate embedding for the article content
      const combinedText = `${article.heading} ${article.content}`;
      const embedding = await generateEmbedding(combinedText);
      
      // Insert article with embedding into Supabase
      await insertArticle(article, embedding);
    } catch (error) {
      console.error(`Failed to process article "${article.heading}":`, error);
    }
  }
  
  console.log('Finished processing all articles.');
}

// Run the main function
processArticles()
  .then(() => console.log('Script completed successfully.'))
  .catch(error => console.error('Script failed:', error));
