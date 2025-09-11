"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemonController_1 = require("../controllers/pokemonController");
const router = (0, express_1.Router)();
// Core Pokemon Operations Routes
// GET /api/pokemon - Get all Pokemon
router.get('/', pokemonController_1.getAllPokemon);
// GET /api/pokemon/stats - Get overall Pokemon statistics
router.get('/stats', pokemonController_1.getPokemonStats);
// GET /api/pokemon/search - Search Pokemon by name
router.get('/search', pokemonController_1.searchPokemon);
// GET /api/pokemon/:id - Get Pokemon by ID
router.get('/:id', pokemonController_1.getPokemonById);
exports.default = router;
//# sourceMappingURL=pokemon.js.map