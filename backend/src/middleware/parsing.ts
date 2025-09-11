import express from 'express';

// JSON parsing middleware
export const jsonMiddleware = express.json();

// URL encoded parsing middleware
export const urlEncodedMiddleware = express.urlencoded({ extended: true });

// Static file serving middleware (if needed for future features)
export const staticMiddleware = express.static('public');

export default jsonMiddleware;
