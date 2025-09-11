import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard, ChartTitle, TooltipContainer, TooltipText } from './RarityChart.styled';

interface StatsEvolutionData {
  timestamp: string;
  count: number;
  avgHp: number;
  avgAttack: number;
  avgDefense: number;
  avgSpecialAttack: number;
  avgSpecialDefense: number;
  avgSpeed: number;
  avgTotalStats: number;
}

interface StatsEvolutionChartProps {
  data: StatsEvolutionData[];
}

const StatsEvolutionChart: React.FC<StatsEvolutionChartProps> = ({ data }) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const timestamp = new Date(label).toLocaleString();
      return (
        <TooltipContainer>
          <TooltipText><strong>Time:</strong> {timestamp}</TooltipText>
          <TooltipText><strong>Pokemon Count:</strong> {payload[0].payload.count}</TooltipText>
          {payload.map((entry: any, index: number) => (
            <TooltipText key={index}>
              <strong style={{ color: entry.color }}>{entry.dataKey}:</strong> {entry.value}
            </TooltipText>
          ))}
        </TooltipContainer>
      );
    }
    return null;
  };

  // Format data for chart
  const chartData = data.map(item => ({
    ...item,
    timestamp: new Date(item.timestamp).getTime(), // Convert to timestamp for X-axis
    timeLabel: new Date(item.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }));

  if (!data || data.length === 0) {
    return (
      <ChartCard>
        <ChartTitle>📈 Pokemon Stats Evolution Over Time</ChartTitle>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          No time-series data available yet. Data will appear as Pokemon are discovered over time.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard>
      <ChartTitle>📈 Pokemon Stats Evolution Over Time</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="timeLabel"
            stroke="#333"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#333" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line 
            type="monotone" 
            dataKey="avgHp" 
            stroke="#ff6b6b" 
            strokeWidth={2}
            name="Avg HP"
            dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgAttack" 
            stroke="#4ecdc4" 
            strokeWidth={2}
            name="Avg Attack"
            dot={{ fill: '#4ecdc4', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgDefense" 
            stroke="#45b7d1" 
            strokeWidth={2}
            name="Avg Defense"
            dot={{ fill: '#45b7d1', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgSpecialAttack" 
            stroke="#96ceb4" 
            strokeWidth={2}
            name="Avg Sp. Attack"
            dot={{ fill: '#96ceb4', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgSpecialDefense" 
            stroke="#feca57" 
            strokeWidth={2}
            name="Avg Sp. Defense"
            dot={{ fill: '#feca57', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgSpeed" 
            stroke="#ff9ff3" 
            strokeWidth={2}
            name="Avg Speed"
            dot={{ fill: '#ff9ff3', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avgTotalStats" 
            stroke="#54a0ff" 
            strokeWidth={3}
            name="Avg Total Stats"
            dot={{ fill: '#54a0ff', strokeWidth: 2, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StatsEvolutionChart;
