import React, { useState, useEffect } from 'react';
import { pokemonAPI } from '../../../services/api';
import { Pokemon } from '../../../types';
import PokemonRadarChart from './PokemonRadarChart';
import AutocompleteInput from '../../../shared/components/AutocompleteInput';
import {
  FormCard,
  Form,
  FormGroup,
  Label,
  Button,
  PokemonPreview,
  PokemonImage,
  PokemonName,
  TypeBadge,
  StatCard,
  StatName,
  StatValue,
} from '../../../shared/components/styled';
import styled from 'styled-components';

const SearchFormCard = styled(FormCard)`
  h2 {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SelectedPokemonContainer = styled(PokemonPreview)`
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1));
`;

const PokemonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PokemonInfo = styled.div`
  flex: 1;
`;

const TypeBadgeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PokemonDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const StatsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const StatsTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.pokemonDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface PokemonSearchProps {
  onPokemonSelected: (pokemon: Pokemon) => void;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ onPokemonSelected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Fetch all Pokemon for autocomplete
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const pokemon = await pokemonAPI.getAllPokemon();
        setAllPokemon(pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon for autocomplete:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    onPokemonSelected(pokemon);
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const results = await pokemonAPI.searchPokemon(searchTerm);
      if (results.length > 0) {
        handlePokemonSelect(results[0]);
      }
    } catch (error) {
      console.error('Error searching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const statData = selectedPokemon ? [
    { name: 'HP', value: selectedPokemon.stats.hp, color: 'hp' },
    { name: 'ATK', value: selectedPokemon.stats.attack, color: 'attack' },
    { name: 'DEF', value: selectedPokemon.stats.defense, color: 'defense' },
    { name: 'SP.A', value: selectedPokemon.stats.specialAttack, color: 'specialAttack' },
    { name: 'SP.D', value: selectedPokemon.stats.specialDefense, color: 'specialDefense' },
    { name: 'SPD', value: selectedPokemon.stats.speed, color: 'speed' },
  ] : [];

  return (
    <>
      <SearchFormCard>
        <h2>🔍 Search Pokemon</h2>
        <Form onSubmit={handleManualSearch}>
          <FormGroup>
            <Label htmlFor="search">Pokemon Name, Type, or ID</Label>
            <AutocompleteInput
              placeholder="Start typing Pokemon name, type, or ID..."
              allPokemon={allPokemon}
              onSelect={handlePokemonSelect}
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? '⚡ Searching...' : '🔍 Manual Search'}
          </Button>
        </Form>

        {selectedPokemon && (
          <SelectedPokemonContainer>
            <SectionTitle>✨ Selected Pokemon</SectionTitle>
            
            <PokemonHeader>
              <PokemonImage
                src={selectedPokemon.imageUrl}
                alt={selectedPokemon.name}
                onError={(e) => {
                  e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.pokemonId}.png`;
                }}
              />
              
              <PokemonInfo>
                <PokemonName>{selectedPokemon.name}</PokemonName>
                
                <TypeBadgeContainer>
                  {selectedPokemon.types.map(type => (
                    <TypeBadge key={type}>{type}</TypeBadge>
                  ))}
                </TypeBadgeContainer>
                
                <PokemonDetails>
                  <div><strong>ID:</strong> #{selectedPokemon.pokemonId}</div>
                  <div><strong>Stage:</strong> {selectedPokemon.evolutionStage}</div>
                  <div><strong>Height:</strong> {selectedPokemon.height / 10}m</div>
                  <div><strong>Weight:</strong> {selectedPokemon.weight / 10}kg</div>
                </PokemonDetails>
              </PokemonInfo>
            </PokemonHeader>

            <StatsSection>
              <StatsTitle>⚡ Base Stats</StatsTitle>
              <StatsGrid>
                {statData.map(stat => (
                  <StatCard key={stat.name}>
                    <StatName color={`var(--${stat.color}-color)`}>
                      {stat.name}
                    </StatName>
                    <StatValue>{stat.value}</StatValue>
                  </StatCard>
                ))}
              </StatsGrid>
            </StatsSection>
          </SelectedPokemonContainer>
        )}
      </SearchFormCard>

      {selectedPokemon && (
        <PokemonRadarChart pokemon={selectedPokemon} />
      )}
    </>
  );
};

export default PokemonSearch;
