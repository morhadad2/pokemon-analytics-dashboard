"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
// Dashboard Analytics Routes
// GET /api/dashboard/types - Get type distribution
router.get('/types', dashboardController_1.getTypeDistribution);
// GET /api/dashboard/evolution - Get evolution stage distribution
router.get('/evolution', dashboardController_1.getEvolutionDistribution);
// GET /api/dashboard/top/:stat - Get top Pokemon by specific stat
router.get('/top/:stat', dashboardController_1.getTopPokemonByStat);
// GET /api/dashboard/rarity - Get rarity analysis
router.get('/rarity', dashboardController_1.getRarityAnalysis);
// GET /api/dashboard/stats-evolution - Get stats evolution over time
router.get('/stats-evolution', dashboardController_1.getStatsEvolutionOverTime);
exports.default = router;
//# sourceMappingURL=dashboard.js.map