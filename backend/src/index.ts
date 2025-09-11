import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import pokemonRoutes from './routes/pokemon';
import dashboardRoutes from './routes/dashboard';
import { PokemonService } from './services/pokemonService';
import { setupMiddleware } from './middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Setup all middleware
setupMiddleware(app);

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Schedule Pokemon data fetching every 10 minutes
const schedulePokemonFetching = () => {
  // Run immediately on startup
  PokemonService.fetchNext50Pokemon().catch(console.error);
  
  // Schedule to run every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log('Running scheduled Pokemon fetch...');
    try {
      const stats = await PokemonService.getPokemonStats();
      console.log(`📊 Current Pokemon collection: ${stats.progress}`);
      await PokemonService.fetchNext50Pokemon();
    } catch (error) {
      console.error('Scheduled fetch error:', error);
    }
  });
  
  console.log('Pokemon fetching scheduled to run every 10 minutes');
};

// Start server
const startServer = async () => {
  await connectDB();
  
  // Start Pokemon data fetching
  schedulePokemonFetching();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Pokemon API endpoints available at http://localhost:${PORT}/api/pokemon`);
    console.log(`📈 Dashboard API endpoints available at http://localhost:${PORT}/api/dashboard`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/api/health`);
  });
};

startServer();
