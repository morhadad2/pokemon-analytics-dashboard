import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Pokemon } from '../types';
import { ChartCard, ChartTitle } from './styled';

interface TopPokemonChartProps {
  data: Pokemon[];
  statName: string;
}

const TopPokemonChart: React.FC<TopPokemonChartProps> = ({ data, statName }) => {
  const formattedData = data.map(pokemon => ({
    name: pokemon.name,
    value: pokemon.stats[statName as keyof typeof pokemon.stats],
    types: pokemon.types.join(', ')
  }));

  return (
    <ChartCard>
      <ChartTitle>Top 10 Pokemon by {statName.charAt(0).toUpperCase() + statName.slice(1)}</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number, name: string) => [value, statName]}
            labelFormatter={(label: string, payload: any) => {
              if (payload && payload[0]) {
                return `${payload[0].payload.name} (${payload[0].payload.types})`;
              }
              return label;
            }}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="#6f42c1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TopPokemonChart;
