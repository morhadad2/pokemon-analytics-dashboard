import { Router } from 'express';
import {
  getDashboardData,
  createDataPoint,
  updateDataPoint,
  deleteDataPoint
} from '../controllers/dashboardController';

const router = Router();

// GET /api/dashboard - Get all dashboard data
router.get('/', getDashboardData);

// POST /api/dashboard - Create new data point
router.post('/', createDataPoint);

// PUT /api/dashboard/:id - Update data point
router.put('/:id', updateDataPoint);

// DELETE /api/dashboard/:id - Delete data point
router.delete('/:id', deleteDataPoint);

export default router;
