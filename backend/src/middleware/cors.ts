import cors from 'cors';

// CORS configuration for Pokemon Analytics Dashboard
export const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// CORS middleware
export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
