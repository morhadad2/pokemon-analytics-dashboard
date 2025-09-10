import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { EvolutionDistribution } from '../types';
import { ChartCard, ChartTitle } from './styled';

interface EvolutionDistributionChartProps {
  data: EvolutionDistribution[];
}

const COLORS = ['#28a745', '#ffc107', '#dc3545'];

const EvolutionDistributionChart: React.FC<EvolutionDistributionChartProps> = ({ data }) => {
  const totalCount = data.reduce((acc, item) => acc + item.count, 0);
  const formattedData = data.map(item => ({
    name: `Stage ${item._id}`,
    value: item.count,
    stage: item._id,
    percentage: ((item.count / totalCount) * 100).toFixed(0)
  }));

  return (
    <ChartCard>
      <ChartTitle>Pokemon Evolution Stage Distribution</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: { name?: string; percent?: number }) => {
              const name = entry.name ?? 'Unknown';
              const percent = entry.percent ?? 0;
              return `${name} ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default EvolutionDistributionChart;
