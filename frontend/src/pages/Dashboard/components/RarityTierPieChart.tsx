import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Pokemon } from '../../../types';
import { 
  ChartCard, 
  ChartTitle, 
  TooltipContainer, 
  TooltipText,
  LegendContainer,
  LegendItem,
  LegendLabel,
  LegendDescription
} from './RarityChart.styled';

interface TierData {
  tier: string;
  count: number;
  percentage: string;
  color: string;
  description: string;
}

interface RarityTierPieChartProps {
  pokemon: Pokemon[];
}

const RarityTierPieChart: React.FC<RarityTierPieChartProps> = ({ pokemon }) => {
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

  // Create tier data
  const tierCounts: { [key: string]: number } = {};
  sortedPokemon.forEach((p, index) => {
    const tier = getTierFromPercentile(index);
    tierCounts[tier] = (tierCounts[tier] || 0) + 1;
  });

  const tierData: TierData[] = [
    { tier: 'S', count: tierCounts.S || 0, percentage: '0', color: '#ff6b6b', description: 'Legendary (Top 1%)' },
    { tier: 'A', count: tierCounts.A || 0, percentage: '0', color: '#4ecdc4', description: 'Elite (Top 5%)' },
    { tier: 'B', count: tierCounts.B || 0, percentage: '0', color: '#45b7d1', description: 'Strong (Top 15%)' },
    { tier: 'C', count: tierCounts.C || 0, percentage: '0', color: '#96ceb4', description: 'Average (Top 40%)' },
    { tier: 'D', count: tierCounts.D || 0, percentage: '0', color: '#feca57', description: 'Common (Bottom 60%)' }
  ].map(tier => ({
    ...tier,
    percentage: ((tier.count / totalCount) * 100).toFixed(1)
  }));

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <TooltipContainer>
          <TooltipText><strong>Tier {data.tier}:</strong> {data.description}</TooltipText>
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
        <ChartTitle>🏆 Pokemon Rarity Tiers</ChartTitle>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          No Pokemon data available for rarity analysis
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard>
      <ChartTitle>🏆 Pokemon Rarity Tiers</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={tierData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => `${entry.tier} (${entry.percentage}%)`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
          >
            {tierData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <LegendContainer>
        {tierData.map(tier => (
          <LegendItem key={tier.tier} color={tier.color}>
            <LegendLabel>Tier {tier.tier}:</LegendLabel>
            <LegendDescription>{tier.description}</LegendDescription>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartCard>
  );
};

export default RarityTierPieChart;
