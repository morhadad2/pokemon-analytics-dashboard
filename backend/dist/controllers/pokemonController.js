"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRarityAnalysis = exports.getTopPokemonByStat = exports.getEvolutionDistribution = exports.getTypeDistribution = exports.getPokemonStats = exports.searchPokemon = exports.getPokemonById = exports.getAllPokemon = void 0;
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
const getRarityAnalysis = async (req, res) => {
    try {
        const pokemon = await Pokemon_1.default.find().select('name pokemonId stats types');
        // Calculate total stats for each Pokemon
        const pokemonWithTotalStats = pokemon.map(p => ({
            ...p.toObject(),
            totalStats: Object.values(p.stats).reduce((sum, stat) => sum + stat, 0)
        }));
        // Sort by total stats to find percentiles
        const sortedPokemon = pokemonWithTotalStats.sort((a, b) => b.totalStats - a.totalStats);
        const totalCount = sortedPokemon.length;
        // Define rarity tiers based on percentiles
        const getTierFromPercentile = (index) => {
            const percentile = (index / totalCount) * 100;
            if (percentile <= 1)
                return 'S';
            if (percentile <= 5)
                return 'A';
            if (percentile <= 15)
                return 'B';
            if (percentile <= 40)
                return 'C';
            return 'D';
        };
        // Create tier data
        const tierCounts = {};
        sortedPokemon.forEach((p, index) => {
            const tier = getTierFromPercentile(index);
            tierCounts[tier] = (tierCounts[tier] || 0) + 1;
        });
        const tierData = [
            { tier: 'S', count: tierCounts.S || 0, description: 'Legendary (Top 1%)' },
            { tier: 'A', count: tierCounts.A || 0, description: 'Elite (Top 5%)' },
            { tier: 'B', count: tierCounts.B || 0, description: 'Strong (Top 15%)' },
            { tier: 'C', count: tierCounts.C || 0, description: 'Average (Top 40%)' },
            { tier: 'D', count: tierCounts.D || 0, description: 'Common (Bottom 60%)' }
        ].map(tier => ({
            ...tier,
            percentage: ((tier.count / totalCount) * 100).toFixed(1)
        }));
        res.json({
            pokemon: sortedPokemon,
            tierData,
            totalCount,
            minStats: Math.min(...pokemonWithTotalStats.map(p => p.totalStats)),
            maxStats: Math.max(...pokemonWithTotalStats.map(p => p.totalStats))
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching rarity analysis' });
    }
};
exports.getRarityAnalysis = getRarityAnalysis;
//# sourceMappingURL=pokemonController.js.map