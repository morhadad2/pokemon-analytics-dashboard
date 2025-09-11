# Pokemon Analytics Dashboard

A full-stack Pokemon analytics dashboard that fetches data from the Pokemon API every couple of minutes and provides interactive visualizations of Pokemon statistics, types, evolution stages, and more.

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

3. update the `.env` file in the backend directory with the correct MONGODB_URI:
```env
PORT=5001
MONGODB_URI=ASK for more the URL for mongoAtlAs instance l
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5001`

### API Endpoints
- `GET /api/pokemon` - Get all Pokemon
- `GET /api/pokemon/:id` - Get Pokemon by ID
- `GET /api/pokemon/search?name=name` - Search Pokemon by name
- `GET /api/pokemon/stats` - Get overall Pokemon statistics
- `GET /api/dashboard/types` - Get Pokemon type distribution
- `GET /api/dashboard/evolution` - Get evolution stage distribution
- `GET /api/dashboard/rarity` - Get rarity analysis data
- `GET /api/dashboard/stats-evolution` - Get stats evolution over time
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

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Features

### Backend Features
- **Pokemon API Integration**: Fetches data from pokeapi.co every 10 minutes using a cron job (simulate getting new data in a live env we just add 50 pokemons using this job if u want to  also for each time the bE is starting he will fetch the next 50 pokemons, if we wannt to simulate getting new data we can change the cron job for every minute or to every 2-3 minutes in backend/src/index.ts:50)
- **Scheduled Data Fetching**: Automatically fetches next 50 Pokemon every 10 minutes using cron job

### Frontend Features
- **Interactive Charts**: Multiple visualization types:
  - **Type Distribution Chart**: Shows how many Pokemon of each type
  - **Evolution Stage Chart**: Compares 1st, 2nd, and 3rd evolution Pokemon
  - **Top Pokemon Charts**: Shows strongest Pokemon by HP, Attack.
- **Pokemon Details**: Complete stats, types, height, weight, evolution stage
- **Real-time Data**: Charts update as new Pokemon are fetched
- **Pokemon Search**: Search and view individual Pokemon details
- **Pokemon Comparison**: Search and compare between multiple pokemons.
- **Rarity Analysis**: Power level histograms and tier distributions (S, A, B, C, D)
- **Trend Analysis**: Stats evolution over time with line charts
- **Auto-refresh**: Real-time data updates every 2 minutes
- **Pokemon Comparison**: Multi-Pokemon comparison with radar charts

## Usage

1. Start the backend server: `cd backend && npm run dev`
   - The server will automatically start fetching Pokemon data
   - First batch of 50 Pokemon will be fetched immediately
   - Every 2 minutes, the next 20 Pokemon will be fetched
3. Start the frontend server: `cd frontend && npm start`
4. Open `http://localhost:3000` in your browser
5. Explore the Pokemon dashboard:
   - **Search Pokemon**: Use the search box to find specific Pokemon
   - **View Charts**: See type distribution, evolution stages, and top performers
   - **Pokemon Details**: Click on search results to see detailed stats

## Technologies Used

### Backend
- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Axios (for Pokemon API calls)
- node-cron (for scheduled tasks)

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
- `PORT` - Server port (default: 5001)
- `MONGODB_URI` -  using mongo atlas - in order to get a working url pleasce contact the owner of this repository 
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5001/api)




 ## testing 
 currently no testing are implements  
 my approach would be:
 first start with unit tests

- unit tests  
   - in fe -  each compnent test  does it render, does it show chart correct when i pass data
   -in the backend test each method by itself, no db, just logic
   - all routs in the be with mock data so i dont hit real db, only check if response is correct shape

- integration tests
  - db + be, see that queries and models work together and no errors when data is missing or strange
- fe + be together, so i can run a flow like user search a pokemon and check the chart updates right

- end 2 end 
 - check user flows - wh


 ## monitorring 
 - add logs to backend so i can trace errors and perf
 - add a health check route so i can know if be is alive
 - put error tracker like sentry for both fe + be so crashes are catched automatic
 - maybe simple metrics like how many api calls per min, which pokemons searched    most, average response time
