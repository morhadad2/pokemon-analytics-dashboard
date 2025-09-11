import { Router } from 'express';
import {
  getAllPokemon,
  getPokemonById,
  searchPokemon,
  getPokemonStats,
  getTypeDistribution,
  getEvolutionDistribution,
  getTopPokemonByStat,
  getRarityAnalysis
} from '../controllers/pokemonController';

const router = Router();

// GET /api/pokemon - Get all Pokemon
router.get('/', getAllPokemon);

// GET /api/pokemon/stats - Get overall Pokemon statistics
router.get('/stats', getPokemonStats);

// GET /api/pokemon/types - Get type distribution
router.get('/types', getTypeDistribution);

// GET /api/pokemon/evolution - Get evolution stage distribution
router.get('/evolution', getEvolutionDistribution);

// GET /api/pokemon/top/:stat - Get top Pokemon by specific stat
router.get('/top/:stat', getTopPokemonByStat);

// GET /api/pokemon/rarity - Get rarity analysis
router.get('/rarity', getRarityAnalysis);

// GET /api/pokemon/search - Search Pokemon by name
router.get('/search', searchPokemon);

// GET /api/pokemon/:id - Get Pokemon by ID
router.get('/:id', getPokemonById);


export default router;
