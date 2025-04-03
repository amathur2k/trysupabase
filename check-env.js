require('dotenv').config();

console.log('Checking environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Set (not showing for security)' : 'Not set');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Set (not showing for security)' : 'Not set');
console.log('PORT:', process.env.PORT);
