import React from 'react';
import PokemonComparison from './components/PokemonComparison';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '../../shared/components/ui';
import styled from 'styled-components';
import { Pokemon } from '../../types';

const ComparisonPageHeader = styled(PageHeader)`
  background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
`;

interface ComparisonProps {
  allPokemon: Pokemon[];
}

const Comparison: React.FC<ComparisonProps> = ({ allPokemon }) => {
  return (
    <>
      <ComparisonPageHeader>
        <PageTitle>⚔️ Pokemon Battle Comparison</PageTitle>
        <PageSubtitle>
          Compare two Pokemon side-by-side with dual radar charts
        </PageSubtitle>
      </ComparisonPageHeader>

      <PokemonComparison allPokemon={allPokemon} />
    </>
  );
};

export default Comparison;
