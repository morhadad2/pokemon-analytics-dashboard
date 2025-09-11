"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemonController_1 = require("../controllers/pokemonController");
const router = (0, express_1.Router)();
// GET /api/pokemon - Get all Pokemon
router.get('/', pokemonController_1.getAllPokemon);
// GET /api/pokemon/stats - Get overall Pokemon statistics
router.get('/stats', pokemonController_1.getPokemonStats);
// GET /api/pokemon/types - Get type distribution
router.get('/types', pokemonController_1.getTypeDistribution);
// GET /api/pokemon/evolution - Get evolution stage distribution
router.get('/evolution', pokemonController_1.getEvolutionDistribution);
// GET /api/pokemon/top/:stat - Get top Pokemon by specific stat
router.get('/top/:stat', pokemonController_1.getTopPokemonByStat);
// GET /api/pokemon/rarity - Get rarity analysis
router.get('/rarity', pokemonController_1.getRarityAnalysis);
// GET /api/pokemon/search - Search Pokemon by name
router.get('/search', pokemonController_1.searchPokemon);
// GET /api/pokemon/:id - Get Pokemon by ID
router.get('/:id', pokemonController_1.getPokemonById);
exports.default = router;
//# sourceMappingURL=pokemon.js.map