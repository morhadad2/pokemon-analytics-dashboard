import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieLabelRenderProps,
} from 'recharts';
import { DataPoint } from '../types';
import { ChartCard, ChartTitle } from './styled';

interface PieChartComponentProps {
  data: DataPoint[];
}

const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#20c997'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  // Group data by category
  const categoryData = data.reduce((acc: any, item) => {
    const existing = acc.find((d: any) => d.name === item.category);
    if (existing) {
      existing.value += item.value;
    } else {
      acc.push({ name: item.category, value: item.value });
    }
    return acc;
  }, []);

  return (
    <ChartCard>
      <ChartTitle>Data by Category</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: { name?: string; percent?: number }) => {
              const name = entry.name ?? 'Unknown';
              const percent = entry.percent ?? 0;
              return `${name} ${(percent * 100).toFixed(0)}%`;
            }} 
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry: any, index: number) => (
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

export default PieChartComponent;
