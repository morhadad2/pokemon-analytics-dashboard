import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Pokemon } from '../../../types';
import { ChartCard, ChartTitle, TooltipContainer, TooltipText } from './RarityChart.styled';

interface RarityData {
  range: string;
  count: number;
  percentage: string;
  tier: string;
  color: string;
}

interface PowerLevelHistogramProps {
  pokemon: Pokemon[];
}

const PowerLevelHistogram: React.FC<PowerLevelHistogramProps> = ({ pokemon }) => {
  // Calculate total stats for each Pokemon
  const pokemonWithTotalStats = pokemon.map(p => {
    let totalStats = 0;
    if (p.stats && typeof p.stats === 'object') {
      const stats = p.stats as any;
      totalStats = (stats.hp || 0) + 
                   (stats.attack || 0) + 
                   (stats.defense || 0) + 
                   (stats.specialAttack || 0) + 
                   (stats.specialDefense || 0) + 
                   (stats.speed || 0);
    }
    
    return {
      ...p,
      totalStats
    };
  });

  // Filter out Pokemon with invalid stats and sort by total stats
  const validPokemon = pokemonWithTotalStats.filter(p => !isNaN(p.totalStats) && p.totalStats > 0);
  const sortedPokemon = validPokemon.sort((a, b) => b.totalStats - a.totalStats);
  const totalCount = sortedPokemon.length;

  // Define rarity tiers based on percentiles
  const getTierFromPercentile = (index: number): string => {
    const percentile = (index / totalCount) * 100;
    if (percentile <= 1) return 'S';
    if (percentile <= 5) return 'A';
    if (percentile <= 15) return 'B';
    if (percentile <= 40) return 'C';
    return 'D';
  };

  // Create tier data for colors
  const tierCounts: { [key: string]: number } = {};
  sortedPokemon.forEach((p, index) => {
    const tier = getTierFromPercentile(index);
    tierCounts[tier] = (tierCounts[tier] || 0) + 1;
  });

  const tierData = [
    { tier: 'S', count: tierCounts.S || 0, color: '#ff6b6b' },
    { tier: 'A', count: tierCounts.A || 0, color: '#4ecdc4' },
    { tier: 'B', count: tierCounts.B || 0, color: '#45b7d1' },
    { tier: 'C', count: tierCounts.C || 0, color: '#96ceb4' },
    { tier: 'D', count: tierCounts.D || 0, color: '#feca57' }
  ];

  // Create stat range data for histogram
  const minStats = Math.min(...sortedPokemon.map(p => p.totalStats));
  const maxStats = Math.max(...sortedPokemon.map(p => p.totalStats));
  const rangeSize = Math.max(1, Math.ceil((maxStats - minStats) / 10));

  const rangeData: RarityData[] = [];
  for (let i = 0; i < 10; i++) {
    const start = minStats + (i * rangeSize);
    const end = i === 9 ? maxStats + 1 : start + rangeSize;
    const count = sortedPokemon.filter(p => 
      p.totalStats >= start && p.totalStats < end
    ).length;
    
    // Get tier for this range (use middle value)
    const middleValue = start + Math.floor(rangeSize / 2);
    const middleIndex = sortedPokemon.findIndex(p => p.totalStats >= middleValue);
    const tier = middleIndex >= 0 ? getTierFromPercentile(middleIndex) : 'D';
    
    rangeData.push({
      range: `${start}-${end - 1}`,
      count,
      percentage: ((count / totalCount) * 100).toFixed(1),
      tier,
      color: tierData.find(t => t.tier === tier)?.color || '#feca57'
    });
  }

  // Custom tooltip for histogram
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <TooltipContainer>
          <TooltipText><strong>Stat Range:</strong> {label}</TooltipText>
          <TooltipText><strong>Count:</strong> {data.count} Pokemon</TooltipText>
          <TooltipText><strong>Percentage:</strong> {data.percentage}%</TooltipText>
        </TooltipContainer>
      );
    }
    return null;
  };

  if (!pokemon || pokemon.length === 0) {
    return (
      <ChartCard>
        <ChartTitle>📊 Pokemon Power Level Distribution</ChartTitle>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          No Pokemon data available for rarity analysis
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard>
      <ChartTitle>📊 Pokemon Power Level Distribution</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={rangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="range" 
            stroke="#333"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#333" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {rangeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PowerLevelHistogram;
