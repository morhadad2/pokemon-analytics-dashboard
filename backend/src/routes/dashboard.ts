import { Router } from 'express';
import {
  getTypeDistribution,
  getEvolutionDistribution,
  getTopPokemonByStat,
  getRarityAnalysis,
  getStatsEvolutionOverTime
} from '../controllers/dashboardController';

const router = Router();

// Dashboard Analytics Routes

// GET /api/dashboard/types - Get type distribution
router.get('/types', getTypeDistribution);

// GET /api/dashboard/evolution - Get evolution stage distribution
router.get('/evolution', getEvolutionDistribution);

// GET /api/dashboard/top/:stat - Get top Pokemon by specific stat
router.get('/top/:stat', getTopPokemonByStat);

// GET /api/dashboard/rarity - Get rarity analysis
router.get('/rarity', getRarityAnalysis);

// GET /api/dashboard/stats-evolution - Get stats evolution over time
router.get('/stats-evolution', getStatsEvolutionOverTime);

export default router;
