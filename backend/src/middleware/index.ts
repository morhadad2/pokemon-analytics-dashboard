// Middleware index file - exports all middleware for easy importing

export { corsMiddleware, corsOptions } from './cors';
export { jsonMiddleware, urlEncodedMiddleware, staticMiddleware } from './parsing';
export { errorHandler, notFoundHandler } from './errorHandler';
export { requestLogger, securityHeaders, rateLimiter } from './security';

// Default middleware setup
import { corsMiddleware } from './cors';
import { jsonMiddleware } from './parsing';
import { errorHandler, notFoundHandler } from './errorHandler';
import { requestLogger, securityHeaders } from './security';

export const setupMiddleware = (app: any) => {
  // Security middleware (should be first)
  app.use(securityHeaders);
  
  // Request logging
  app.use(requestLogger);
  
  // CORS
  app.use(corsMiddleware);
  
  // Body parsing
  app.use(jsonMiddleware);
  
  // Note: 404 handler should be added AFTER routes in main index.ts
  // Error handler (should be last)
  app.use(errorHandler);
};

export default setupMiddleware;
