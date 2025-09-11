import React from 'react';
import { Pokemon } from '../../../types';
import PowerLevelHistogram from './PowerLevelHistogram';
import RarityTierPieChart from './RarityTierPieChart';
import { RarityContainer } from './RarityChart.styled';

interface RarityDistributionChartProps {
  pokemon: Pokemon[];
}

const RarityDistributionChart: React.FC<RarityDistributionChartProps> = ({ pokemon }) => {
  return (
    <RarityContainer>
      <PowerLevelHistogram pokemon={pokemon} />
      <RarityTierPieChart pokemon={pokemon} />
    </RarityContainer>
  );
};

export default RarityDistributionChart;