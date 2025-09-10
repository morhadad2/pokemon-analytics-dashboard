# Pokemon Analytics Dashboard

A full-stack Pokemon analytics dashboard that fetches data from the Pokemon API every hour and provides interactive visualizations of Pokemon statistics, types, evolution stages, and more.

## Project Structure

```
dashboard/
├── backend/          # Node.js + TypeScript + Express + MongoDB
└── frontend/         # React + TypeScript + Styled Components + Recharts
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation & Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dashboard
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### API Endpoints

#### Health & Dashboard
- `GET /api/health` - Health check
- `GET /api/dashboard` - Get all data points (legacy)
- `POST /api/dashboard` - Create new data point (legacy)

#### Pokemon Endpoints
- `GET /api/pokemon` - Get all Pokemon
- `GET /api/pokemon/:id` - Get Pokemon by ID
- `GET /api/pokemon/search?name=name` - Search Pokemon by name
- `GET /api/pokemon/stats` - Get overall Pokemon statistics
- `GET /api/pokemon/types` - Get Pokemon type distribution
- `GET /api/pokemon/evolution` - Get evolution stage distribution
- `GET /api/pokemon/top/:stat` - Get top Pokemon by specific stat (hp, attack, defense, etc.)

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)

### Installation & Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Features

### Backend Features
- **Pokemon API Integration**: Fetches data from pokeapi.co every hour
- **Scheduled Data Fetching**: Automatically fetches next 50 Pokemon every hour using cron jobs
- **MongoDB Storage**: Stores Pokemon data with comprehensive schemas
- **Evolution Detection**: Determines Pokemon evolution stages (1st, 2nd, 3rd)
- **RESTful API**: Complete CRUD operations for Pokemon data
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Robust error handling and logging

### Frontend Features
- **Pokemon Search**: Search and view individual Pokemon details
- **Interactive Charts**: Multiple visualization types:
  - **Type Distribution Chart**: Shows how many Pokemon of each type
  - **Evolution Stage Chart**: Compares 1st, 2nd, and 3rd evolution Pokemon
  - **Top Pokemon Charts**: Shows strongest Pokemon by HP, Attack, etc.
- **Pokemon Details**: Complete stats, types, height, weight, evolution stage
- **Real-time Data**: Charts update as new Pokemon are fetched
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, intuitive interface with Styled Components

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server: `cd backend && npm run dev`
   - The server will automatically start fetching Pokemon data
   - First batch of 50 Pokemon will be fetched immediately
   - Every hour, the next 50 Pokemon will be fetched
3. Start the frontend server: `cd frontend && npm start`
4. Open `http://localhost:3000` in your browser
5. Explore the Pokemon dashboard:
   - **Search Pokemon**: Use the search box to find specific Pokemon
   - **View Charts**: See type distribution, evolution stages, and top performers
   - **Pokemon Details**: Click on search results to see detailed stats
   - **Real-time Updates**: Charts update as new Pokemon are fetched hourly

## Technologies Used

### Backend
- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Axios (for Pokemon API calls)
- node-cron (for scheduled tasks)
- CORS
- dotenv

### Frontend
- React
- TypeScript
- Styled Components
- Recharts
- Axios
- Create React App

### External APIs
- Pokemon API (pokeapi.co)

## Development

### Backend Development
```bash
cd backend
npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Development
```bash
cd frontend
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)
