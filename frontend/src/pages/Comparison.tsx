import React from 'react';
import PokemonComparison from '../components/PokemonComparison';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '../components/styled';
import styled from 'styled-components';

const ComparisonPageHeader = styled(PageHeader)`
  background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
`;

const Comparison: React.FC = () => {
  return (
    <>
      <ComparisonPageHeader>
        <PageTitle>⚔️ Pokemon Battle Comparison</PageTitle>
        <PageSubtitle>
          Compare two Pokemon side-by-side with dual radar charts
        </PageSubtitle>
      </ComparisonPageHeader>

      <PokemonComparison />
    </>
  );
};

export default Comparison;
