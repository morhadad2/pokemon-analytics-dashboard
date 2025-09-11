import { Request, Response, NextFunction } from 'express';

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler middleware
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: [
      'GET /api/health',
      'GET /api/pokemon',
      'GET /api/pokemon/:id',
      'GET /api/pokemon/search',
      'GET /api/pokemon/stats',
      'GET /api/dashboard/types',
      'GET /api/dashboard/evolution',
      'GET /api/dashboard/top/:stat',
      'GET /api/dashboard/rarity',
      'GET /api/dashboard/stats-evolution'
    ]
  });
};

export default errorHandler;
