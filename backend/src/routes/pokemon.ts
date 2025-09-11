import { Router } from 'express';
import {
  getAllPokemon,
  getPokemonById,
  searchPokemon,
  getPokemonStats
} from '../controllers/pokemonController';

const router = Router();

// Core Pokemon Operations Routes

// GET /api/pokemon - Get all Pokemon
router.get('/', getAllPokemon);

// GET /api/pokemon/stats - Get overall Pokemon statistics
router.get('/stats', getPokemonStats);

// GET /api/pokemon/search - Search Pokemon by name
router.get('/search', searchPokemon);

// GET /api/pokemon/:id - Get Pokemon by ID
router.get('/:id', getPokemonById);

export default router;
