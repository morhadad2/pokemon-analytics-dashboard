import React from 'react';
import { 
  TypeDistribution, 
  EvolutionDistribution, 
  Pokemon 
} from '../types';
import {
  DashboardGrid,
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '../components/styled';
import TypeDistributionChart from '../components/TypeDistributionChart';
import EvolutionDistributionChart from '../components/EvolutionDistributionChart';
import TopPokemonChart from '../components/TopPokemonChart';
import styled from 'styled-components';

const DashboardPageHeader = styled(PageHeader)`
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
`;

interface DashboardProps {
  typeDistribution: TypeDistribution[];
  evolutionDistribution: EvolutionDistribution[];
  topPokemonByAttack: Pokemon[];
  topPokemonByHp: Pokemon[];
  topPokemonByDefense: Pokemon[];
  topPokemonBySpeed: Pokemon[];
}

const Dashboard: React.FC<DashboardProps> = ({
  typeDistribution,
  evolutionDistribution,
  topPokemonByAttack,
  topPokemonByHp,
  topPokemonByDefense,
  topPokemonBySpeed,
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
        <TopPokemonChart data={topPokemonByAttack} statName="attack" />
        <TopPokemonChart data={topPokemonByHp} statName="hp" />
      </DashboardGrid>

      <DashboardGrid>
        <TopPokemonChart data={topPokemonByDefense} statName="defense" />
        <TopPokemonChart data={topPokemonBySpeed} statName="speed" />
      </DashboardGrid>
    </>
  );
};

export default Dashboard;
