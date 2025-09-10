import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Pokemon } from '../../../types';
import { ChartCard, ChartTitle } from '../../Dashboard/components';

interface PokemonRadarChartProps {
  pokemon: Pokemon;
  showTitle?: boolean;
}

const PokemonRadarChart: React.FC<PokemonRadarChartProps> = ({ pokemon, showTitle = true }) => {
  const radarData = [
    {
      stat: 'HP',
      value: pokemon.stats.hp,
      fullMark: 255
    },
    {
      stat: 'Attack',
      value: pokemon.stats.attack,
      fullMark: 255
    },
    {
      stat: 'Defense',
      value: pokemon.stats.defense,
      fullMark: 255
    },
    {
      stat: 'Sp. Attack',
      value: pokemon.stats.specialAttack,
      fullMark: 255
    },
    {
      stat: 'Sp. Defense',
      value: pokemon.stats.specialDefense,
      fullMark: 255
    },
    {
      stat: 'Speed',
      value: pokemon.stats.speed,
      fullMark: 255
    }
  ];

  const getStatColor = (statValue: number) => {
    if (statValue >= 120) return '#e74c3c'; // Red for high stats
    if (statValue >= 90) return '#f39c12';  // Orange for good stats
    if (statValue >= 60) return '#f1c40f';  // Yellow for average stats
    if (statValue >= 40) return '#2ecc71';  // Green for low stats
    return '#3498db'; // Blue for very low stats
  };

  const averageStats = radarData.reduce((sum, stat) => sum + stat.value, 0) / radarData.length;

  return (
    <ChartCard style={{ minHeight: showTitle ? '450px' : '400px' }}>
      {showTitle && (
        <ChartTitle>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} Stats Radar
        </ChartTitle>
      )}
      
      <ResponsiveContainer width="100%" height={showTitle ? 350 : 400}>
        <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis 
            dataKey="stat" 
            tick={{ fontSize: 12, fontWeight: 'bold' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 255]}
            tick={{ fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name={pokemon.name}
            dataKey="value"
            stroke={getStatColor(averageStats)}
            fill={getStatColor(averageStats)}
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ fill: getStatColor(averageStats), strokeWidth: 2, r: 4 }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      
      {showTitle && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <div>
            <strong>Total:</strong> {radarData.reduce((sum, stat) => sum + stat.value, 0)}
          </div>
          <div>
            <strong>Average:</strong> {Math.round(averageStats)}
          </div>
          <div>
            <strong>Highest:</strong> {Math.max(...radarData.map(s => s.value))}
          </div>
        </div>
      )}
    </ChartCard>
  );
};

export default PokemonRadarChart;
