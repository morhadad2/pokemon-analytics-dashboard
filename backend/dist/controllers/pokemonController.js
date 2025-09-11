"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationDistribution = exports.getTopPokemonByStat = exports.getEvolutionDistribution = exports.getTypeDistribution = exports.getPokemonStats = exports.searchPokemon = exports.getPokemonById = exports.getAllPokemon = void 0;
const Pokemon_1 = __importDefault(require("../models/Pokemon"));
const getAllPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon_1.default.find().sort({ pokemonId: 1 });
        res.json(pokemon);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching Pokemon data' });
    }
};
exports.getAllPokemon = getAllPokemon;
const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon_1.default.findOne({ pokemonId: parseInt(id) });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.json(pokemon);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching Pokemon' });
    }
};
exports.getPokemonById = getPokemonById;
const searchPokemon = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        const pokemon = await Pokemon_1.default.find({
            name: { $regex: name, $options: 'i' }
        }).limit(10);
        res.json(pokemon);
    }
    catch (error) {
        res.status(500).json({ message: 'Error searching Pokemon' });
    }
};
exports.searchPokemon = searchPokemon;
const getPokemonStats = async (req, res) => {
    try {
        const stats = await Pokemon_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalPokemon: { $sum: 1 },
                    avgHp: { $avg: '$stats.hp' },
                    avgAttack: { $avg: '$stats.attack' },
                    avgDefense: { $avg: '$stats.defense' },
                    avgSpecialAttack: { $avg: '$stats.specialAttack' },
                    avgSpecialDefense: { $avg: '$stats.specialDefense' },
                    avgSpeed: { $avg: '$stats.speed' },
                    maxHp: { $max: '$stats.hp' },
                    maxAttack: { $max: '$stats.attack' },
                    maxDefense: { $max: '$stats.defense' },
                    maxSpecialAttack: { $max: '$stats.specialAttack' },
                    maxSpecialDefense: { $max: '$stats.specialDefense' },
                    maxSpeed: { $max: '$stats.speed' }
                }
            }
        ]);
        res.json(stats[0] || {});
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching Pokemon stats' });
    }
};
exports.getPokemonStats = getPokemonStats;
const getTypeDistribution = async (req, res) => {
    try {
        const typeDistribution = await Pokemon_1.default.aggregate([
            { $unwind: '$types' },
            {
                $group: {
                    _id: '$types',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        res.json(typeDistribution);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching type distribution' });
    }
};
exports.getTypeDistribution = getTypeDistribution;
const getEvolutionDistribution = async (req, res) => {
    try {
        const evolutionDistribution = await Pokemon_1.default.aggregate([
            {
                $group: {
                    _id: '$evolutionStage',
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(evolutionDistribution);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching evolution distribution' });
    }
};
exports.getEvolutionDistribution = getEvolutionDistribution;
const getTopPokemonByStat = async (req, res) => {
    try {
        const { stat } = req.params;
        const validStats = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
        if (!validStats.includes(stat)) {
            return res.status(400).json({ message: 'Invalid stat name' });
        }
        const topPokemon = await Pokemon_1.default.find()
            .sort({ [`stats.${stat}`]: -1 })
            .limit(10)
            .select(`name pokemonId stats.${stat} types`);
        res.json(topPokemon);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching top Pokemon by stat' });
    }
};
exports.getTopPokemonByStat = getTopPokemonByStat;
const getGenerationDistribution = async (req, res) => {
    try {
        const generationDistribution = await Pokemon_1.default.aggregate([
            { $group: { _id: '$generation', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(generationDistribution);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching generation distribution' });
    }
};
exports.getGenerationDistribution = getGenerationDistribution;
//# sourceMappingURL=pokemonController.js.map