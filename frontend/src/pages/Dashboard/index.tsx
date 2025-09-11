import React from 'react';
import { 
  Distribution, 
  Pokemon 
} from '../../types';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '../../shared/components/ui';
import { DashboardGrid } from './components';
import TypeDistributionChart from './components/TypeDistributionChart';
import EvolutionDistributionChart from './components/EvolutionDistributionChart';
import TopPokemonChart from './components/TopPokemonChart';
import RarityDistributionChart from './components/RarityDistributionChart';
import styled from 'styled-components';

const DashboardPageHeader = styled(PageHeader)`
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
`;

interface DashboardProps {
  typeDistribution: Distribution[];
  evolutionDistribution: Distribution[];
  topPokemonByAttack: Pokemon[];
  topPokemonByHp: Pokemon[];
  topPokemonByDefense: Pokemon[];
  topPokemonBySpeed: Pokemon[];
  rarityAnalysis: any;
}

const Dashboard: React.FC<DashboardProps> = ({
  typeDistribution,
  evolutionDistribution,
  topPokemonByAttack,
  topPokemonByHp,
  topPokemonByDefense,
  topPokemonBySpeed,
  rarityAnalysis,
}) => {
  return (
    <>
      <DashboardPageHeader>
        <PageTitle>📊 Pokemon Analytics Overview</PageTitle>
        <PageSubtitle>
          Comprehensive statistical analysis of Pokemon data
        </PageSubtitle>
      </DashboardPageHeader>

      <DashboardGrid>
        <TypeDistributionChart data={typeDistribution} />
        <EvolutionDistributionChart data={evolutionDistribution} />
      </DashboardGrid>

      <DashboardGrid>
          <RarityDistributionChart pokemon={rarityAnalysis.pokemon} />
        </DashboardGrid>
        
      <DashboardGrid>
        <TopPokemonChart data={topPokemonByAttack} statName="attack" />
        <TopPokemonChart data={topPokemonByHp} statName="hp" />
      </DashboardGrid>




    </>
  );
};

export default Dashboard;
