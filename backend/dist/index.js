"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const pokemon_1 = __importDefault(require("./routes/pokemon"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const pokemonService_1 = require("./services/pokemonService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';
        await mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
// Routes
app.use('/api/pokemon', pokemon_1.default);
app.use('/api/dashboard', dashboard_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Schedule Pokemon data fetching every hour
const schedulePokemonFetching = () => {
    // Run immediately on startup
    pokemonService_1.PokemonService.fetchNext50Pokemon().catch(console.error);
    // Schedule to run every hour
    node_cron_1.default.schedule('0 * * * *', () => {
        console.log('Running scheduled Pokemon fetch...');
        pokemonService_1.PokemonService.fetchNext50Pokemon().catch(console.error);
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
        console.log(`Dashboard API endpoints available at http://localhost:${PORT}/api/dashboard`);
    });
};
startServer();
//# sourceMappingURL=index.js.map