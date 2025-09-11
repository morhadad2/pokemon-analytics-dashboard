import React from 'react';
import { Pokemon } from '../../../types';
import AutocompleteInput from '../../../shared/components/AutocompleteInput';
import { FormGroup, Label } from '../../../shared/components/ui';
import {
  PokemonCard,
  PokemonCard2,
  PokemonImage,
  PokemonName,
  TypesContainer,
  TypeBadge,
  TotalStats
} from './styled';

interface ComparedPokemonProps {
  pokemon: Pokemon | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onPokemonSelect: (pokemon: Pokemon) => void;
  allPokemon: Pokemon[];
  label: string;
  icon: string;
  variant?: 'primary' | 'secondary';
  totalStats: number;
}

const ComparedPokemon: React.FC<ComparedPokemonProps> = ({
  pokemon,
  searchTerm,
  onSearchChange,
  onPokemonSelect,
  allPokemon,
  label,
  icon,
  variant = 'primary',
  totalStats
}) => {
  const CardComponent = variant === 'primary' ? PokemonCard : PokemonCard2;

  const handlePokemonSelect = (selectedPokemon: Pokemon) => {
    onPokemonSelect(selectedPokemon);
  };

  return (
    <div>
      <FormGroup>
        <Label>{icon} {label}</Label>
        <AutocompleteInput
          placeholder={`Search ${label.toLowerCase()}...`}
          allPokemon={allPokemon}
          onSelect={handlePokemonSelect}
          value={searchTerm}
          onChange={onSearchChange}
        />
      </FormGroup>
      
      {pokemon && (
        <CardComponent>
          <PokemonImage
            src={pokemon.imageUrl}
            alt={pokemon.name}
            onError={(e) => {
              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`;
            }}
          />
          <PokemonName>{pokemon.name}</PokemonName>
          <TypesContainer>
            {pokemon.types.map(type => (
              <TypeBadge key={type}>{type}</TypeBadge>
            ))}
          </TypesContainer>
          <TotalStats>Total Stats: <strong>{totalStats}</strong></TotalStats>
        </CardComponent>
      )}
    </div>
  );
};

export default ComparedPokemon;
