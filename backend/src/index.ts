import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import pokemonRoutes from './routes/pokemon';
import { PokemonService } from './services/pokemonService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Schedule Pokemon data fetching every hour
const schedulePokemonFetching = () => {
  // Run immediately on startup
  PokemonService.fetchNext50Pokemon().catch(console.error);
  
  // Schedule to run every hour
  cron.schedule('0 * * * *', () => {
    console.log('Running scheduled Pokemon fetch...');
    PokemonService.fetchNext50Pokemon().catch(console.error);
  });
  
  console.log('Pokemon fetching scheduled to run every hour');
};

// Start server
const startServer = async () => {
  await connectDB();
  
  // Start Pokemon data fetching
  schedulePokemonFetching();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Pokemon API endpoints available at http://localhost:${PORT}/api/pokemon`);
  });
};

startServer();
