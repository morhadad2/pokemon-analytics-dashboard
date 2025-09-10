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
import { TypeDistribution } from '../types';
import { ChartCard, ChartTitle } from './styled';

interface TypeDistributionChartProps {
  data: TypeDistribution[];
}

const TypeDistributionChart: React.FC<TypeDistributionChartProps> = ({ data }) => {
  return (
    <ChartCard>
      <ChartTitle>Pokemon Type Distribution</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="_id" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#007bff"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TypeDistributionChart;
