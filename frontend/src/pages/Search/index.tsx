import React, { useState } from 'react';
import { Pokemon } from '../../types';
import PokemonSearch from './components/PokemonSearch';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '../../shared/components/styled';
import styled from 'styled-components';

const SearchPageHeader = styled(PageHeader)`
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1));
`;

const Search: React.FC = () => {
  const handlePokemonSelected = (pokemon: Pokemon) => {
    // Pokemon selection handled within PokemonSearch component
    console.log('Pokemon selected:', pokemon.name);
  };

  return (
    <>
      <SearchPageHeader>
        <PageTitle>🔍 Pokemon Search & Analysis</PageTitle>
        <PageSubtitle>
          Search for Pokemon and view detailed stats with radar charts
        </PageSubtitle>
      </SearchPageHeader>

      <PokemonSearch onPokemonSelected={handlePokemonSelected} />
    </>
  );
};

export default Search;
